import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertTriangle, DollarSign, Zap } from "lucide-react"
import Link from "next/link"

export default function InfraPredictPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-6">
                AIOps Tool
              </Badge>
              <h1 className="text-5xl font-bold mb-6">InfraPredict</h1>
              <p className="text-2xl text-muted-foreground mb-8">
                AI-Powered Capacity Planning That Predicts Your Infrastructure Needs 3-6 Months in Advance
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
                  <TrendingUp className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Predictive Autoscaling</CardTitle>
                  <CardDescription>
                    ML models analyze historical patterns, seasonal trends, and business metrics to recommend scaling
                    actions before demand hits
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Anomaly Detection</CardTitle>
                  <CardDescription>
                    Identify unusual patterns and forecast potential incidents before they impact production systems
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Cost Projection</CardTitle>
                  <CardDescription>
                    95% accuracy in predicting future cloud spend with detailed breakdowns by service and region
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>What-If Scenarios</CardTitle>
                  <CardDescription>
                    Model different growth scenarios and architecture changes to understand their impact before
                    implementation
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <p className="text-lg text-muted-foreground mb-8">
              InfraPredict connects to your monitoring systems (Prometheus, CloudWatch, Datadog) and analyzes months of
              historical data to build accurate prediction models. It considers seasonality, growth trends, deployment
              patterns, and business metrics to forecast your infrastructure needs with industry-leading accuracy.
            </p>
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
