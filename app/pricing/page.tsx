import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Building2, Rocket, Crown } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Startup",
      icon: Rocket,
      price: "Custom",
      description: "Perfect for startups building their first cloud infrastructure",
      features: [
        "Up to 10 servers managed",
        "Single cloud provider",
        "Basic monitoring & alerting",
        "Email support (24h response)",
        "Monthly architecture review",
        "Infrastructure as Code setup",
        "CI/CD pipeline configuration",
        "Security best practices",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      icon: Building2,
      price: "Custom",
      description: "For growing companies with multi-service infrastructure",
      features: [
        "Up to 50 servers managed",
        "Multi-cloud support",
        "Advanced monitoring & AIOps",
        "24/7 chat + email support",
        "Weekly architecture review",
        "Managed databases (Kafka, MongoDB, etc)",
        "Auto-scaling configuration",
        "Disaster recovery planning",
        "Cost optimization reports",
        "Quarterly infrastructure audits",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      description: "For large-scale operations requiring maximum reliability",
      features: [
        "Unlimited servers managed",
        "Full multi-cloud orchestration",
        "AI-powered predictive monitoring",
        "24/7 phone + dedicated Slack channel",
        "Daily health checks",
        "Complete managed services portfolio",
        "Multi-region high availability",
        "Compliance support (SOC2, HIPAA, PCI-DSS)",
        "Dedicated DevOps engineer",
        "Custom SLA agreements",
        "Priority incident response",
        "Executive reporting dashboard",
      ],
      highlighted: false,
    },
  ]

  const managedServices = [
    {
      service: "Managed Kafka",
      pricing: [
        { tier: "Small", specs: "3 brokers, 500GB", price: "$800/month" },
        { tier: "Medium", specs: "5 brokers, 2TB", price: "$1,800/month" },
        { tier: "Large", specs: "10+ brokers, 5TB+", price: "$4,000+/month" },
      ],
    },
    {
      service: "Managed MongoDB",
      pricing: [
        { tier: "Small", specs: "Replica set, 100GB", price: "$500/month" },
        { tier: "Medium", specs: "Sharded cluster, 500GB", price: "$1,200/month" },
        { tier: "Large", specs: "Multi-region, 2TB+", price: "$3,000+/month" },
      ],
    },
    {
      service: "Managed Elasticsearch",
      pricing: [
        { tier: "Small", specs: "3 nodes, 250GB", price: "$600/month" },
        { tier: "Medium", specs: "6 nodes, 1TB", price: "$1,500/month" },
        { tier: "Large", specs: "12+ nodes, 5TB+", price: "$3,500+/month" },
      ],
    },
    {
      service: "Managed PostgreSQL/MySQL",
      pricing: [
        { tier: "Small", specs: "Master + replica, 100GB", price: "$400/month" },
        { tier: "Medium", specs: "HA setup, 500GB", price: "$900/month" },
        { tier: "Large", specs: "Multi-AZ, 2TB+", price: "$2,000+/month" },
      ],
    },
  ]

  const migrations = [
    { type: "Small Migration", details: "< 20 servers, single application", price: "$8,000 - $15,000" },
    { type: "Medium Migration", details: "20-100 servers, multiple applications", price: "$25,000 - $60,000" },
    { type: "Large Migration", details: "100+ servers, complex microservices", price: "$75,000 - $200,000+" },
    { type: "Data Center Exit", details: "Complete DC migration with zero downtime", price: "Custom quote" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 font-mono">
                $ pricing --transparent
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Flexible pricing models designed to grow with your infrastructure needs. No hidden fees, no vendor
                lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Managed Service Plans */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Managed Service Plans</h2>
              <p className="text-lg text-muted-foreground">Choose the plan that fits your infrastructure scale</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan, index) => {
                const Icon = plan.icon
                return (
                  <Card key={index} className={plan.highlighted ? "border-primary shadow-lg relative" : ""}>
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className="inline-flex p-3 bg-primary/10 rounded-lg mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold my-4">{plan.price}</div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-8" variant={plan.highlighted ? "default" : "outline"} asChild>
                        <Link href="/contact">Get Started</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              All plans include infrastructure monitoring, security patches, and regular backups
            </p>
          </div>
        </section>

        {/* Managed Database Services */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Managed Database Services</h2>
              <p className="text-lg text-muted-foreground">
                Fully managed database clusters with 24/7 monitoring and maintenance
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {managedServices.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{service.service}</CardTitle>
                    <CardDescription>Includes setup, monitoring, backups, and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {service.pricing.map((tier, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-semibold">{tier.tier}</p>
                            <p className="text-sm text-muted-foreground">{tier.specs}</p>
                          </div>
                          <Badge variant="secondary">{tier.price}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Custom configurations available for specific requirements
            </p>
          </div>
        </section>

        {/* Migration Projects */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cloud Migration Projects</h2>
              <p className="text-lg text-muted-foreground">Fixed-price migration services with guaranteed timelines</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {migrations.map((migration, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{migration.type}</p>
                          <p className="text-sm text-muted-foreground">{migration.details}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {migration.price}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Includes:</strong> Assessment, architecture design, implementation, testing, cutover
                      support, and 30-day post-migration support
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Quote?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every infrastructure is unique. Let's discuss your requirements and create a tailored pricing plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Request Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/get-started">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
