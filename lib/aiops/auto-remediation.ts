import type { Incident, RemediationAction } from "./types"

export class AutoRemediationEngine {
  private remediationRules = new Map<string, (incident: Incident) => RemediationAction>()
  private executionHistory: RemediationAction[] = []

  constructor() {
    this.initializeRules()
  }

  private initializeRules() {
    // High Memory Usage
    this.remediationRules.set("memory", (incident) => ({
      id: `remediation_${Date.now()}`,
      incidentId: incident.id,
      action: "Restart service with memory leak",
      type: "restart",
      status: "pending",
      automated: true,
    }))

    // Network connectivity issues
    this.remediationRules.set("network", (incident) => ({
      id: `remediation_${Date.now()}`,
      incidentId: incident.id,
      action: "Failover to backup endpoint",
      type: "failover",
      status: "pending",
      automated: true,
    }))

    // Disk space issues
    this.remediationRules.set("disk", (incident) => ({
      id: `remediation_${Date.now()}`,
      incidentId: incident.id,
      action: "Clean up old logs and temporary files",
      type: "custom",
      status: "pending",
      automated: true,
    }))

    // High CPU usage
    this.remediationRules.set("cpu", (incident) => ({
      id: `remediation_${Date.now()}`,
      incidentId: incident.id,
      action: "Scale out service horizontally",
      type: "scale",
      status: "pending",
      automated: true,
    }))

    // Database issues
    this.remediationRules.set("database", (incident) => ({
      id: `remediation_${Date.now()}`,
      incidentId: incident.id,
      action: "Clear connection pool and restart",
      type: "restart",
      status: "pending",
      automated: true,
    }))
  }

  /**
   * Determine if incident can be auto-remediated
   */
  canAutoRemediate(incident: Incident): boolean {
    if (!incident.rootCause) return false
    if (incident.severity === "low") return false

    const hasRule = this.remediationRules.has(incident.rootCause)
    const recentFailures = this.getRecentFailures(incident.rootCause)

    // Don't auto-remediate if there were recent failures for the same issue
    return hasRule && recentFailures < 2
  }

  /**
   * Execute auto-remediation for an incident
   */
  async executeRemediation(incident: Incident): Promise<RemediationAction> {
    if (!incident.rootCause) {
      throw new Error("Cannot remediate incident without root cause")
    }

    const rule = this.remediationRules.get(incident.rootCause)
    if (!rule) {
      throw new Error(`No remediation rule for ${incident.rootCause}`)
    }

    const action = rule(incident)
    action.status = "in-progress"
    action.executedAt = Date.now()

    // Simulate remediation execution
    // In production, this would call actual infrastructure APIs
    await this.simulateExecution(action)

    action.status = "completed"
    action.completedAt = Date.now()
    action.result = "Remediation successful"

    this.executionHistory.push(action)

    return action
  }

  private async simulateExecution(action: RemediationAction): Promise<void> {
    // Simulate different execution times based on action type
    const delays = {
      restart: 2000,
      scale: 3000,
      failover: 1500,
      "config-change": 1000,
      custom: 2500,
    }

    await new Promise((resolve) => setTimeout(resolve, delays[action.type]))
  }

  private getRecentFailures(rootCause: string): number {
    const oneHourAgo = Date.now() - 3600000
    return this.executionHistory.filter((a) => a.status === "failed" && a.executedAt && a.executedAt > oneHourAgo)
      .length
  }

  /**
   * Get remediation statistics
   */
  getStatistics() {
    const total = this.executionHistory.length
    const successful = this.executionHistory.filter((a) => a.status === "completed").length
    const failed = this.executionHistory.filter((a) => a.status === "failed").length

    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      avgExecutionTime: this.calculateAvgExecutionTime(),
    }
  }

  private calculateAvgExecutionTime(): number {
    const completed = this.executionHistory.filter((a) => a.status === "completed" && a.executedAt && a.completedAt)

    if (completed.length === 0) return 0

    const totalTime = completed.reduce((sum, a) => sum + (a.completedAt! - a.executedAt!), 0)

    return totalTime / completed.length
  }
}
