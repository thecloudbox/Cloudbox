import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, CheckCircle2, ArrowRight, Target, Shield, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "ChaosPilot - Intelligent Chaos Engineering | TheCloudbox",
  description:
    "AI-guided chaos experiments that safely test infrastructure resilience with automated blast radius calculation",
}

export default function ChaosPilotPage() {
  const features = [
    "Automated blast radius calculation before experiments",
    "Safe experiment design and execution with guardrails",
    "Resilience scoring and comprehensive reporting",
    "Continuous validation testing in production",
    "Integration with monitoring and alerting systems",
    "Hypothesis-driven experiment creation",
    "Rollback automation and safety mechanisms",
    "Game day scenario planning and execution",
  ]

  const experiments = [
    {
      icon: Target,
      title: "Latency Injection",
      description: "Introduce controlled network delays to test timeout handling and graceful degradation",
    },
    {
      icon: Shield,
      title: "Failure Injection",
      description: "Simulate service failures, database crashes, and dependency outages to validate recovery",
    },
    {
      icon: TrendingUp,
      title: "Resource Exhaustion",
      description: "Test behavior under CPU, memory, and disk pressure to ensure proper resource management",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 border-sea-green/50 text-sea-green">
              Beta Access Available
            </Badge>
            <h1 className="mb-6 text-5xl font-bold">
              Chaos<span className="text-primary">Pilot</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              AI-guided chaos engineering platform that safely tests your infrastructure resilience with automated
              experiment design and execution
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
                <Link href="/get-started">
                  Request Beta Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {experiments.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Icon className="mb-2 h-8 w-8 text-sea-green" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Safe Chaos Engineering</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Guided Experiments</CardTitle>
                  <CardDescription>Intelligent experiment design based on your architecture</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ChaosPilot analyzes your infrastructure dependencies and automatically designs targeted chaos
                    experiments that validate critical failure modes without risking production stability
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blast Radius Protection</CardTitle>
                  <CardDescription>Calculate impact before running experiments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every experiment includes automated blast radius calculation showing which services will be
                    affected, estimated user impact, and rollback plans before execution
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Continuous Resilience Testing</CardTitle>
                  <CardDescription>Automated validation in production</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Schedule recurring chaos experiments during low-traffic windows to continuously validate your
                    system's ability to handle failures and maintain SLOs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Platform Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-sea-green" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Activity className="mx-auto mb-4 h-12 w-12 text-sea-green" />
            <h2 className="mb-4 text-3xl font-bold">Build Resilient Systems</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join the beta program and start testing your infrastructure resilience with intelligent chaos engineering
            </p>
            <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
              <Link href="/get-started">
                Request Beta Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
