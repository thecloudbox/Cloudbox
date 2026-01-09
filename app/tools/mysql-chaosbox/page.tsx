import { Button } from "@/components/ui/button"
import { Download, BookOpen, Github, Terminal, Database, Network, Cpu } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function MySQLChaosBoxPage() {
  return (
    <div className="min-h-screen bg-[#0d0e14]">
      <main className="container mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-lg bg-emerald-500/10 px-4 py-2">
            <span className="font-mono text-sm text-emerald-400">Open Source • Production Ready</span>
          </div>
          <h1 className="mb-6 font-mono text-5xl font-bold text-white">
            MySQL <span className="text-emerald-400">ChaosBox</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            Enterprise chaos engineering for MySQL, ProxySQL, Replication & PXC clusters
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
              <Download className="mr-2 h-5 w-5" />
              Download v1.0.0
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Documentation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-emerald-500/20 bg-[#1a1d29]">
            <CardHeader>
              <Database className="mb-2 h-8 w-8 text-emerald-400" />
              <CardTitle className="text-white">40+ Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                Comprehensive chaos for MySQL, replication, ProxySQL, and PXC clusters
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-[#1a1d29]">
            <CardHeader>
              <Network className="mb-2 h-8 w-8 text-emerald-400" />
              <CardTitle className="text-white">Network Chaos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Partition, latency, packet loss using iptables and toxiproxy</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-[#1a1d29]">
            <CardHeader>
              <Cpu className="mb-2 h-8 w-8 text-emerald-400" />
              <CardTitle className="text-white">Resource Stress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">CPU, memory, disk I/O stress testing with stress-ng</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-[#1a1d29]">
            <CardHeader>
              <Terminal className="mb-2 h-8 w-8 text-emerald-400" />
              <CardTitle className="text-white">Built-in Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Prometheus metrics and Grafana dashboards included</p>
            </CardContent>
          </Card>
        </div>

        {/* Download Options */}
        <div className="mb-16">
          <h2 className="mb-8 text-center font-mono text-2xl font-bold text-white">Get Started</h2>
          <Tabs defaultValue="docker" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-4 bg-[#1a1d29]">
              <TabsTrigger value="docker">Docker</TabsTrigger>
              <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
              <TabsTrigger value="binary">Binary</TabsTrigger>
              <TabsTrigger value="source">Source</TabsTrigger>
            </TabsList>

            <TabsContent value="docker" className="rounded-lg border border-emerald-500/20 bg-[#1a1d29] p-6">
              <pre className="overflow-x-auto text-sm text-emerald-400">
                {`# Pull and run
docker pull ghcr.io/thecloudbox/mysql-chaosbox:latest
docker run -d -p 8080:8080 mysql-chaosbox

# Or use docker-compose
curl -O https://thecloudbox.io/downloads/mysql-chaosbox-compose.yml
docker-compose up -d`}
              </pre>
            </TabsContent>

            <TabsContent value="kubernetes" className="rounded-lg border border-emerald-500/20 bg-[#1a1d29] p-6">
              <pre className="overflow-x-auto text-sm text-emerald-400">
                {`# Using kubectl
kubectl apply -f https://thecloudbox.io/k8s/mysql-chaosbox.yaml

# Or using Helm
helm repo add thecloudbox https://charts.thecloudbox.io
helm install mysql-chaosbox thecloudbox/mysql-chaosbox`}
              </pre>
            </TabsContent>

            <TabsContent value="binary" className="rounded-lg border border-emerald-500/20 bg-[#1a1d29] p-6">
              <pre className="overflow-x-auto text-sm text-emerald-400">
                {`# Linux/macOS install script
curl -L https://thecloudbox.io/install-chaosbox.sh | bash

# Or download directly
# Visit: https://thecloudbox.io/downloads/mysql-chaosbox/
# Choose your platform and download`}
              </pre>
            </TabsContent>

            <TabsContent value="source" className="rounded-lg border border-emerald-500/20 bg-[#1a1d29] p-6">
              <pre className="overflow-x-auto text-sm text-emerald-400">
                {`# Build from source (requires Go 1.21+)
# Source code available on request or GitHub release
# Contact: hello@thecloudbox.io

# When released:
git clone https://github.com/thecloudbox/mysql-chaosbox
cd mysql-chaosbox
go build ./cmd/chaosbox
./chaosbox --version`}
              </pre>
            </TabsContent>
          </Tabs>
        </div>

        {/* Scenarios Overview */}
        <div className="mb-16">
          <h2 className="mb-8 text-center font-mono text-2xl font-bold text-white">Chaos Scenarios</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-emerald-500/20 bg-[#1a1d29]">
              <CardHeader>
                <CardTitle className="font-mono text-emerald-400">MySQL Server Chaos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Process crash and restart
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Connection exhaustion
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Slow query injection
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Disk space fill
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-[#1a1d29]">
              <CardHeader>
                <CardTitle className="font-mono text-emerald-400">Replication Chaos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Replication lag injection
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Master-slave split
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Binlog corruption
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Slave connection loss
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-[#1a1d29]">
              <CardHeader>
                <CardTitle className="font-mono text-emerald-400">ProxySQL Chaos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Backend offline
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Query routing failure
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Connection pool exhaustion
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Health check failure
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-[#1a1d29]">
              <CardHeader>
                <CardTitle className="font-mono text-emerald-400">PXC Cluster Chaos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Network partition (split-brain)
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Node crash
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Flow control activation
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    Quorum loss
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-lg border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent p-12 text-center">
          <h2 className="mb-4 font-mono text-3xl font-bold text-white">Ready to Test Your MySQL Infrastructure?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400">
            Download MySQL ChaosBox today and start building resilient database systems through controlled chaos
            engineering.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-started">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                Get Started Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
