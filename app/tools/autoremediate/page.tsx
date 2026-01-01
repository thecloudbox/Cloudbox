import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, CheckCircle2, ArrowRight, Bot, Clock, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "AutoRemediate - Self-Healing Infrastructure | TheCloudbox",
  description:
    "Automated incident response system that detects, diagnoses, and resolves infrastructure issues without human intervention",
}

export default function AutoRemediatePage() {
  const capabilities = [
    "Automated runbook execution for common incidents",
    "Context-aware decision making using ML",
    "Progressive learning from past incidents",
    "Safe rollback mechanisms with instant recovery",
    "Integration with Slack, PagerDuty, and OpsGenie",
    "Custom remediation script support",
    "Audit trail and compliance reporting",
    "Multi-tenant isolation and security",
  ]

  const useCases = [
    {
      title: "Memory Leak Detection",
      description: "Automatically detects memory leaks, identifies the process, and restarts services safely",
      incidents: "Resolves 95% of memory issues",
    },
    {
      title: "Disk Space Management",
      description: "Monitors disk usage, cleans temporary files, rotates logs, and alerts before critical levels",
      incidents: "Prevents 90% of disk full outages",
    },
    {
      title: "Service Health Checks",
      description: "Continuously monitors service health, detects failures, and performs automatic restarts",
      incidents: "Reduces MTTR by 80%",
    },
    {
      title: "Database Connection Pooling",
      description: "Detects connection pool exhaustion and automatically scales connections or restarts pools",
      incidents: "Prevents connection timeout errors",
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
              Auto<span className="text-primary">Remediate</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Self-healing infrastructure platform that automatically detects, diagnoses, and resolves common issues
              without human intervention
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
                <Link href="/get-started">
                  Request Beta Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Bot className="mb-2 h-8 w-8 text-sea-green" />
                <CardTitle>AI-Powered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Machine learning models learn from every incident to improve remediation accuracy over time
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="mb-2 h-8 w-8 text-sea-green" />
                <CardTitle>80% MTTR Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Average incident resolution time reduced from 30 minutes to 6 minutes with automation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-sea-green" />
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built-in safety checks, rollback mechanisms, and audit trails ensure secure automated operations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Common Use Cases</h2>
            <p className="text-lg text-muted-foreground">AutoRemediate handles these scenarios automatically</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((useCase, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-sea-green/10 text-sea-green">{useCase.incidents}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Platform Capabilities</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {capabilities.map((capability, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-sea-green" />
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Enable Self-Healing?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join the beta program and start automating incident response today
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
