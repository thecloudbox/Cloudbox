import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, DollarSign, Target, BookOpen, Activity, ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "CloudSentinel - AI-Powered AIOps Platform | TheCloudbox",
  description:
    "Open-source ML-powered monitoring with natural language queries, cost intelligence, blast radius prediction, and auto-remediation",
}

export default function CloudSentinelPage() {
  const features = [
    {
      icon: Brain,
      title: "Natural Language Queries",
      description: "Ask questions in plain English - 'Why was the API slow at 3pm yesterday?'",
      path: "/cloudsentinel?tab=nl-query",
      badge: "Revolutionary",
    },
    {
      icon: DollarSign,
      title: "Cross-Cloud Cost Intelligence",
      description: "Correlate cost spikes with performance issues across AWS, GCP, Azure, Linode",
      path: "/cloudsentinel?tab=cost",
      badge: "Market First",
    },
    {
      icon: Target,
      title: "Blast Radius Predictor",
      description: "Forecast affected services BEFORE deploying changes",
      path: "/cloudsentinel?tab=blast-radius",
      badge: "Predictive",
    },
    {
      icon: BookOpen,
      title: "Auto-Generated Runbooks",
      description: "ML learns from incidents and creates automated remediation playbooks",
      path: "/cloudsentinel?tab=runbooks",
      badge: "Self-Learning",
    },
    {
      icon: Activity,
      title: "ML Anomaly Detection",
      description: "Z-score based detection with adaptive thresholds and correlation analysis",
      path: "/cloudsentinel?tab=dashboard",
      badge: "AI-Powered",
    },
  ]

  const metrics = [
    { label: "MTTR Reduction", value: "80%", description: "30 min → 6 min average" },
    { label: "Incident Prevention", value: "95%", description: "Predictive models prevent issues" },
    { label: "Auto-Resolution Rate", value: "70%", description: "No human intervention needed" },
    { label: "Cost Savings", value: "25%", description: "Through optimization" },
  ]

  const capabilities = [
    "Real-time anomaly detection using ML",
    "Automatic incident correlation",
    "Cost-performance linkage across clouds",
    "Dependency graph analysis",
    "Automated remediation execution",
    "Pattern recognition and learning",
    "Multi-tenant monitoring",
    "Compliance drift detection",
    "Developer experience metrics",
    "Chaos engineering recommendations",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 border-sea-green/50 text-sea-green">
              Open Source AIOps Platform
            </Badge>
            <h1 className="mb-6 text-5xl font-bold">
              Cloud<span className="text-primary">Sentinel</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              ML-powered predictive monitoring and automated remediation. Ask questions in natural language, predict
              blast radius, correlate costs, and auto-generate runbooks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
                <Link href="/cloudsentinel">
                  Launch CloudSentinel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/get-started">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-4">
            {metrics.map((metric, idx) => (
              <Card key={idx} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-sea-green">{metric.value}</CardTitle>
                  <CardDescription className="text-base font-semibold">{metric.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">5 Revolutionary Features</h2>
            <p className="text-lg text-muted-foreground">Features that don't exist in commercial AIOps platforms</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <Card key={idx} className="group transition-all hover:border-sea-green hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex items-start justify-between">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <Badge variant="outline" className="border-sea-green/50 text-sea-green">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-sea-green/10 group-hover:text-sea-green"
                  >
                    <Link href={feature.path}>
                      Try it now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Complete AIOps Capabilities</h2>
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

      {/* Architecture Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">How CloudSentinel Works</h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold text-primary">1. Data Collection</h3>
                    <p className="text-sm text-muted-foreground">
                      Ingests metrics, logs, and events from Prometheus, Grafana, cloud providers, and application APIs
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-primary">2. ML Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Z-score anomaly detection, time-series forecasting, pattern recognition, and correlation analysis
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-primary">3. Intelligent Correlation</h3>
                    <p className="text-sm text-muted-foreground">
                      Links related anomalies, correlates costs with performance, builds dependency graphs
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-primary">4. Auto-Remediation</h3>
                    <p className="text-sm text-muted-foreground">
                      Executes remediation actions, learns from patterns, generates runbooks automatically
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Operations?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Start using CloudSentinel today. Open source, production-ready, enterprise-grade AIOps.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
                <Link href="/cloudsentinel">
                  Launch CloudSentinel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="https://github.com/thecloudbox/cloudsentinel" target="_blank">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
