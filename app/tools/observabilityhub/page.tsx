import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Database, Activity, BarChart } from "lucide-react"
import Link from "next/link"

export default function ObservabilityHubPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-6">
                Monitoring Platform
              </Badge>
              <h1 className="text-5xl font-bold mb-6">ObservabilityHub</h1>
              <p className="text-2xl text-muted-foreground mb-8">
                Unified Monitoring Dashboard for All Your Managed Services
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Request Demo</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <Database className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Unified Metrics</CardTitle>
                  <CardDescription>
                    Monitor Kafka, Redis, MongoDB, Elasticsearch, PostgreSQL, and MySQL from a single pane of glass
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Activity className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Cross-Service Correlation</CardTitle>
                  <CardDescription>
                    Automatically correlate metrics across services to identify cascading failures and dependencies
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Eye className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Intelligent Alerts</CardTitle>
                  <CardDescription>
                    ML-powered alert aggregation reduces alert fatigue by 90% while improving incident detection
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>SLO Tracking</CardTitle>
                  <CardDescription>
                    Define and track custom SLOs with detailed error budgets and burn rate analysis
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Supported Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {["Kafka", "Redis", "MongoDB", "Elasticsearch", "PostgreSQL", "MySQL"].map((service) => (
                <Badge key={service} variant="outline" className="py-2 text-base">
                  {service}
                </Badge>
              ))}
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
