import type { BlastRadiusAnalysis } from "./types"

/**
 * Blast Radius Predictor
 * Market gap: Predicts impact scope before deploying changes
 */
export class BlastRadiusPredictor {
  private serviceDependencies: Map<string, string[]> = new Map([
    ["api-gateway", ["auth-service", "user-service", "payment-service"]],
    ["auth-service", ["database", "cache"]],
    ["user-service", ["database", "cache", "notification-service"]],
    ["payment-service", ["database", "external-payment-api"]],
    ["notification-service", ["email-service", "sms-service"]],
  ])

  /**
   * Analyze blast radius for a proposed change
   */
  analyzeChange(
    targetService: string,
    changeType: "deployment" | "config" | "scaling" | "migration",
  ): BlastRadiusAnalysis {
    const affectedServices = this.calculateAffectedServices(targetService)
    const riskScore = this.calculateRiskScore(targetService, changeType, affectedServices)
    const impactedUsers = this.estimateUserImpact(affectedServices)

    return {
      changeId: `change_${Date.now()}`,
      affectedServices,
      riskScore,
      impactedUsers,
      dependencyChain: this.buildDependencyChain(targetService),
      recommendations: this.generateRecommendations(riskScore, changeType),
      rollbackPlan: this.generateRollbackPlan(targetService, changeType),
    }
  }

  private calculateAffectedServices(service: string): string[] {
    const affected = new Set<string>([service])
    const queue = [service]

    // Find all services that depend on this service
    while (queue.length > 0) {
      const current = queue.shift()!

      this.serviceDependencies.forEach((deps, svc) => {
        if (deps.includes(current) && !affected.has(svc)) {
          affected.add(svc)
          queue.push(svc)
        }
      })
    }

    return Array.from(affected)
  }

  private calculateRiskScore(service: string, changeType: string, affectedServices: string[]): number {
    let score = 0

    // Base risk by change type
    const typeRisk = { deployment: 30, config: 50, scaling: 20, migration: 70 }
    score += typeRisk[changeType as keyof typeof typeRisk] || 30

    // Risk increases with more affected services
    score += affectedServices.length * 5

    // Critical services add more risk
    if (service.includes("payment") || service.includes("auth")) {
      score += 20
    }

    return Math.min(score, 100)
  }

  private estimateUserImpact(affectedServices: string[]): number {
    // Simplified user impact calculation
    const impactMap: Record<string, number> = {
      "api-gateway": 10000,
      "auth-service": 8000,
      "payment-service": 5000,
      "user-service": 7000,
    }

    return affectedServices.reduce((sum, svc) => sum + (impactMap[svc] || 1000), 0)
  }

  private buildDependencyChain(service: string): string[] {
    const chain: string[] = [service]
    const deps = this.serviceDependencies.get(service) || []
    return [...chain, ...deps]
  }

  private generateRecommendations(riskScore: number, changeType: string): string[] {
    const recommendations: string[] = []

    if (riskScore > 70) {
      recommendations.push("Deploy during low-traffic window")
      recommendations.push("Enable feature flag for gradual rollout")
      recommendations.push("Increase monitoring alerts")
    }

    if (riskScore > 50) {
      recommendations.push("Perform canary deployment")
      recommendations.push("Have rollback plan ready")
    }

    recommendations.push("Monitor key metrics for 30 minutes post-deployment")

    return recommendations
  }

  private generateRollbackPlan(service: string, changeType: string): string {
    return `1. Trigger rollback via CI/CD pipeline
2. Revert ${service} to previous stable version
3. Clear cache and restart dependent services
4. Verify health checks pass
5. Monitor for 15 minutes to confirm stability`
  }
}
