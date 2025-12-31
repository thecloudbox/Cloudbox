import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building2, Rocket, Factory, ShoppingCart, HeartPulse, GraduationCap } from "lucide-react"

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Building2,
      title: "Enterprise & Financial Services",
      description:
        "Mission-critical infrastructure for banks, insurance companies, and large enterprises requiring 99.99% uptime and regulatory compliance.",
      challenges: ["Strict compliance requirements", "Zero-downtime migrations", "Multi-region disaster recovery"],
      outcomes: ["SOC 2 Type II & PCI DSS compliance", "< 5 minutes RTO", "40% reduction in operational costs"],
    },
    {
      icon: Rocket,
      title: "Startups & Scale-ups",
      description:
        "Rapid infrastructure scaling for high-growth companies moving from MVP to millions of users without operational headaches.",
      challenges: ["Rapid user growth", "Limited engineering resources", "Tight budgets with VC oversight"],
      outcomes: ["10x traffic scaling with zero downtime", "Focus on product, not ops", "Cost-optimized architecture"],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce & Retail",
      description:
        "High-performance infrastructure handling peak traffic during sales events while maintaining sub-second page loads.",
      challenges: ["Traffic spikes during sales", "Payment processing reliability", "Global content delivery"],
      outcomes: ["99.99% uptime during Black Friday", "< 200ms page load times", "Auto-scaling for 10x traffic"],
    },
    {
      icon: HeartPulse,
      title: "Healthcare & Life Sciences",
      description:
        "HIPAA-compliant infrastructure for healthcare providers, with secure data handling and high availability for patient systems.",
      challenges: ["HIPAA & GDPR compliance", "PHI data security", "Integration with legacy systems"],
      outcomes: ["Full HIPAA compliance", "Encrypted data at rest & transit", "Secure EHR integrations"],
    },
    {
      icon: Factory,
      title: "Manufacturing & IoT",
      description:
        "Edge computing and data pipeline infrastructure for IoT devices, real-time analytics, and predictive maintenance.",
      challenges: ["Edge device management", "Real-time data processing", "Predictive analytics at scale"],
      outcomes: ["Sub-100ms edge processing", "Billions of events daily", "Predictive maintenance ROI"],
    },
    {
      icon: GraduationCap,
      title: "Education & EdTech",
      description:
        "Scalable learning platforms supporting millions of students with reliable video streaming and real-time collaboration.",
      challenges: ["Seasonal traffic patterns", "Video streaming at scale", "Global student base"],
      outcomes: ["Support for 1M+ concurrent users", "99.9% video streaming uptime", "40% cost reduction"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry Solutions</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tailored infrastructure solutions designed for the unique challenges of your industry, backed by proven
                expertise and real-world results.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid gap-8">
              {solutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-6">
                        <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{solution.title}</CardTitle>
                          <CardDescription className="text-base">{solution.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="ml-20 grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                            Common Challenges
                          </h4>
                          <ul className="space-y-2">
                            {solution.challenges.map((challenge, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                                <span className="text-sm">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                            Delivered Outcomes
                          </h4>
                          <ul className="space-y-2">
                            {solution.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span className="text-sm">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Case Study CTA */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
                <CardContent className="p-12">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      Success Stories
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">See Real Results</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                      Discover how we've helped companies in your industry overcome infrastructure challenges and
                      achieve their business goals.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button size="lg" asChild>
                        <Link href="/case-studies">View Case Studies</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/contact">Discuss Your Needs</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
