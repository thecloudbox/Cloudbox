import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, ArrowRight, CheckCircle2, Cloud } from "lucide-react"

export const metadata: Metadata = {
  title: "CloudCostOptimizer - Real-Time Cost Intelligence | TheCloudbox",
  description:
    "AI-driven cost optimization engine that continuously analyzes cloud spending and implements cost-saving recommendations",
}

export default function CloudCostOptimizerPage() {
  const features = [
    "Real-time cost anomaly detection across all cloud providers",
    "Automated reserved instance and savings plan optimization",
    "Rightsizing recommendations with impact analysis",
    "Multi-cloud cost comparison and arbitrage opportunities",
    "Idle resource detection and automatic cleanup",
    "Cost allocation and chargeback reporting",
    "Budget alerts with ML-powered forecasting",
    "Integration with AWS, GCP, Azure, and Linode billing APIs",
  ]

  const savings = [
    { provider: "AWS", average: "28%", description: "Average cost reduction through optimization" },
    { provider: "GCP", average: "32%", description: "Savings from rightsizing and commitment analysis" },
    { provider: "Azure", average: "25%", description: "Cost savings via automated recommendations" },
    { provider: "Linode", average: "22%", description: "Optimization through instance selection" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 border-sea-green/50 text-sea-green">
              Available Now
            </Badge>
            <h1 className="mb-6 text-5xl font-bold">
              Cloud<span className="text-primary">Cost</span>Optimizer
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              AI-driven cost optimization that continuously monitors spending and automatically implements approved
              cost-saving recommendations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
                <Link href="/get-started">
                  Start Saving Today
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
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Average Savings by Cloud Provider</h2>
            <p className="text-lg text-muted-foreground">Real results from our customers</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {savings.map((item, idx) => (
              <Card key={idx} className="text-center">
                <CardHeader>
                  <Cloud className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <CardTitle>{item.provider}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-4xl font-bold text-sea-green">{item.average}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                      1
                    </div>
                    <CardTitle>Continuous Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    CloudCostOptimizer monitors your infrastructure 24/7, analyzing usage patterns, resource
                    utilization, and spending trends across all cloud providers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                      2
                    </div>
                    <CardTitle>Smart Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ML algorithms identify optimization opportunities including rightsizing, reserved instances, spot
                    instances, and idle resource cleanup
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                      3
                    </div>
                    <CardTitle>Automated Implementation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Approved recommendations are automatically implemented during maintenance windows with full audit
                    trails and rollback capabilities
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
            <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
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

      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <TrendingDown className="mx-auto mb-4 h-12 w-12 text-sea-green" />
            <h2 className="mb-4 text-3xl font-bold">Start Reducing Costs Today</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join hundreds of companies saving millions on cloud infrastructure costs
            </p>
            <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
              <Link href="/get-started">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
