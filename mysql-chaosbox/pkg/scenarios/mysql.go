package scenarios

import (
	"database/sql"
	"fmt"
	"os/exec"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type MySQLChaos struct {
	Target   string
	Host     string
	Port     int
	User     string
	Password string
	db       *sql.DB
}

func NewMySQLChaos(config map[string]interface{}) *MySQLChaos {
	return &MySQLChaos{
		Target:   config["target"].(string),
		Host:     config["host"].(string),
		Port:     config["port"].(int),
		User:     config["user"].(string),
		Password: config["password"].(string),
	}
}

func (m *MySQLChaos) Connect() error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/", m.User, m.Password, m.Host, m.Port)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return err
	}
	m.db = db
	return db.Ping()
}

// ProcessKill - Kill MySQL process
func (m *MySQLChaos) ProcessKill(signal string) error {
	fmt.Printf("[CHAOS] Killing MySQL process with %s\n", signal)
	
	cmd := exec.Command("ssh", m.Host, fmt.Sprintf("sudo pkill -%s mysqld", signal))
	return cmd.Run()
}

// SlowQueryStorm - Inject slow queries
func (m *MySQLChaos) SlowQueryStorm(connections int, duration time.Duration) error {
	fmt.Printf("[CHAOS] Injecting %d slow queries for %s\n", connections, duration)
	
	done := make(chan bool)
	go func() {
		time.Sleep(duration)
		done <- true
	}()

	for i := 0; i < connections; i++ {
		go func() {
			db, _ := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/", m.User, m.Password, m.Host, m.Port))
			defer db.Close()
			
			for {
				select {
				case <-done:
					return
				default:
					db.Exec("SELECT SLEEP(10) FROM information_schema.tables LIMIT 1")
				}
			}
		}()
	}

	<-done
	return nil
}

// ConnectionFlood - Exhaust connections
func (m *MySQLChaos) ConnectionFlood(connections int, duration time.Duration) error {
	fmt.Printf("[CHAOS] Flooding %d connections for %s\n", connections, duration)
	
	conns := make([]*sql.DB, connections)
	for i := 0; i < connections; i++ {
		db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/", m.User, m.Password, m.Host, m.Port))
		if err != nil {
			fmt.Printf("Failed to create connection %d: %v\n", i, err)
			continue
		}
		conns[i] = db
	}

	time.Sleep(duration)

	// Close all connections
	for _, conn := range conns {
		if conn != nil {
			conn.Close()
		}
	}

	return nil
}

// DiskFill - Fill disk space
func (m *MySQLChaos) DiskFill(path string, fillPercent int, duration time.Duration) error {
	fmt.Printf("[CHAOS] Filling disk %s to %d%% for %s\n", path, fillPercent, duration)
	
	cmd := exec.Command("ssh", m.Host, fmt.Sprintf(
		"sudo fallocate -l $(($(df %s | tail -1 | awk '{print $4}') * %d / 100))K %s/chaos-fill.tmp",
		path, fillPercent, path,
	))
	if err := cmd.Run(); err != nil {
		return err
	}

	time.Sleep(duration)

	// Cleanup
	cleanupCmd := exec.Command("ssh", m.Host, fmt.Sprintf("sudo rm -f %s/chaos-fill.tmp", path))
	return cleanupCmd.Run()
}

// ReplicationDelay - Inject replication lag
func (m *MySQLChaos) ReplicationDelay(delaySec int, duration time.Duration) error {
	fmt.Printf("[CHAOS] Injecting %ds replication delay for %s\n", delaySec, duration)
	
	// Stop slave
	if _, err := m.db.Exec("STOP SLAVE"); err != nil {
		return err
	}

	// Wait for delay
	time.Sleep(time.Duration(delaySec) * time.Second)

	// Start slave
	if _, err := m.db.Exec("START SLAVE"); err != nil {
		return err
	}

	time.Sleep(duration)

	return nil
}

// ReplicationBreak - Break replication
func (m *MySQLChaos) ReplicationBreak(thread string, duration time.Duration) error {
	fmt.Printf("[CHAOS] Breaking %s replication thread for %s\n", thread, duration)
	
	if thread == "SQL" || thread == "ALL" {
		if _, err := m.db.Exec("STOP SLAVE SQL_THREAD"); err != nil {
			return err
		}
	}
	
	if thread == "IO" || thread == "ALL" {
		if _, err := m.db.Exec("STOP SLAVE IO_THREAD"); err != nil {
			return err
		}
	}

	time.Sleep(duration)

	// Restore
	if _, err := m.db.Exec("START SLAVE"); err != nil {
		return err
	}

	return nil
}

// CPUStress - Stress CPU
func (m *MySQLChaos) CPUStress(cores int, percent int, duration time.Duration) error {
	fmt.Printf("[CHAOS] Stressing %d CPU cores at %d%% for %s\n", cores, percent, duration)
	
	cmd := exec.Command("ssh", m.Host, fmt.Sprintf(
		"stress-ng --cpu %d --cpu-load %d --timeout %ds",
		cores, percent, int(duration.Seconds()),
	))
	return cmd.Run()
}

// IODelay - Inject IO latency
func (m *MySQLChaos) IODelay(delayMs int, device string, duration time.Duration) error {
	fmt.Printf("[CHAOS] Injecting %dms IO delay on %s for %s\n", delayMs, device, duration)
	
	// Using tc (traffic control) for IO delay
	cmd := exec.Command("ssh", m.Host, fmt.Sprintf(
		"sudo tc qdisc add dev %s root netem delay %dms",
		device, delayMs,
	))
	if err := cmd.Run(); err != nil {
		return err
	}

	time.Sleep(duration)

	// Cleanup
	cleanupCmd := exec.Command("ssh", m.Host, fmt.Sprintf("sudo tc qdisc del dev %s root", device))
	return cleanupCmd.Run()
}

// NetworkLatency - Inject network latency
func (m *MySQLChaos) NetworkLatency(latencyMs int, jitterMs int, duration time.Duration) error {
	fmt.Printf("[CHAOS] Injecting %dms latency (+/- %dms jitter) for %s\n", latencyMs, jitterMs, duration)
	
	cmd := exec.Command("ssh", m.Host, fmt.Sprintf(
		"sudo tc qdisc add dev eth0 root netem delay %dms %dms distribution normal",
		latencyMs, jitterMs,
	))
	if err := cmd.Run(); err != nil {
		return err
	}

	time.Sleep(duration)

	// Cleanup
	cleanupCmd := exec.Command("ssh", m.Host, "sudo tc qdisc del dev eth0 root")
	return cleanupCmd.Run()
}

// PacketLoss - Inject packet loss
func (m *MySQLChaos) PacketLoss(lossPercent int, duration time.Duration) error {
	fmt.Printf("[CHAOS] Injecting %d%% packet loss for %s\n", lossPercent, duration)
	
	cmd := exec.Command("ssh", m.Host, fmt.Sprintf(
		"sudo tc qdisc add dev eth0 root netem loss %d%%",
		lossPercent,
	))
	if err := cmd.Run(); err != nil {
		return err
	}

	time.Sleep(duration)

	// Cleanup
	cleanupCmd := exec.Command("ssh", m.Host, "sudo tc qdisc del dev eth0 root")
	return cleanupCmd.Run()
}
