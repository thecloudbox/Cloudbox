import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Heart, ShoppingCart, Cloud, Gamepad2, Plane, Building2, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function IndustriesPage() {
  const industries = [
    {
      icon: CreditCard,
      name: "FinTech & Payments",
      description:
        "High-throughput transaction processing with sub-second latency requirements and regulatory compliance",
      challenges: [
        "PCI-DSS compliance",
        "Real-time fraud detection",
        "High availability (99.99%+)",
        "Data encryption at rest and in transit",
      ],
      solutions: [
        "Multi-region active-active architecture",
        "Managed Kafka for transaction streaming",
        "Redis for real-time caching",
        "Automated compliance monitoring",
      ],
      clients: ["Paytm"],
    },
    {
      icon: Plane,
      name: "Travel & Transportation",
      description:
        "Handle massive traffic spikes during peak booking periods with global distribution system integration",
      challenges: [
        "Unpredictable traffic patterns",
        "Global low-latency requirements",
        "Legacy system integration",
        "Inventory synchronization",
      ],
      solutions: [
        "Auto-scaling infrastructure",
        "CDN and edge caching",
        "MongoDB for flexible data models",
        "API gateway with rate limiting",
      ],
      clients: ["Mystifly", "IRCTC"],
    },
    {
      icon: Heart,
      name: "Healthcare & Life Sciences",
      description: "HIPAA-compliant infrastructure with end-to-end encryption for sensitive patient data",
      challenges: [
        "HIPAA compliance requirements",
        "PHI data protection",
        "Audit logging and reporting",
        "High security standards",
      ],
      solutions: [
        "Encrypted databases and backups",
        "Private cloud deployment options",
        "Comprehensive audit trails",
        "Regular security assessments",
      ],
      clients: ["Part+"],
    },
    {
      icon: ShoppingCart,
      name: "E-commerce & Retail",
      description:
        "Scalable platforms handling flash sales, inventory management, and personalized customer experiences",
      challenges: [
        "Flash sale traffic spikes",
        "Real-time inventory tracking",
        "Personalization at scale",
        "Multi-channel integration",
      ],
      solutions: [
        "Elastic compute resources",
        "Event-driven architecture with Kafka",
        "Elasticsearch for product search",
        "Redis for session management",
      ],
      clients: [],
    },
    {
      icon: Cloud,
      name: "SaaS & Cloud Services",
      description: "Multi-tenant architecture with resource isolation, monitoring, and cost optimization",
      challenges: ["Multi-tenant isolation", "Usage-based billing", "API rate limiting", "Customer data segregation"],
      solutions: [
        "Kubernetes-based microservices",
        "Tenant-aware monitoring",
        "Cost allocation and chargeback",
        "Automated scaling policies",
      ],
      clients: [],
    },
    {
      icon: Gamepad2,
      name: "Gaming & Media",
      description: "Low-latency infrastructure for real-time gaming, streaming, and content delivery",
      challenges: [
        "Ultra-low latency requirements",
        "Global player distribution",
        "Large media file handling",
        "Real-time matchmaking",
      ],
      solutions: [
        "Multi-region edge deployment",
        "Object storage with CDN",
        "Redis for leaderboards and sessions",
        "WebSocket infrastructure",
      ],
      clients: [],
    },
    {
      icon: Building2,
      name: "Enterprise & Logistics",
      description: "Complex supply chain management, warehouse operations, and multi-modal transportation tracking",
      challenges: [
        "Supply chain visibility",
        "Real-time tracking",
        "Integration with IoT devices",
        "Legacy ERP integration",
      ],
      solutions: [
        "Event streaming for real-time updates",
        "Time-series databases",
        "API gateway for integration",
        "Data warehouse for analytics",
      ],
      clients: ["Gojek"],
    },
    {
      icon: TrendingUp,
      name: "Startups & Scale-ups",
      description: "Cost-effective infrastructure that grows with your business from MVP to enterprise scale",
      challenges: [
        "Limited budget constraints",
        "Rapid growth requirements",
        "Technical debt accumulation",
        "Hiring challenges",
      ],
      solutions: [
        "Right-sized infrastructure",
        "Managed services to reduce ops burden",
        "Best practices from day one",
        "Flexible support models",
      ],
      clients: [],
    },
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
                $ industries --specialized
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Industries We Serve</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Deep domain expertise across verticals with unique infrastructure challenges. We understand your
                industry's requirements, compliance needs, and scalability patterns.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {industries.map((industry, index) => {
                const Icon = industry.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{industry.name}</CardTitle>
                          {industry.clients.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {industry.clients.map((client, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {client}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <CardDescription>{industry.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Key Challenges:</h4>
                        <ul className="space-y-1">
                          {industry.challenges.map((challenge, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Our Solutions:</h4>
                        <div className="flex flex-wrap gap-2">
                          {industry.solutions.map((solution, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {solution}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Industry, Our Expertise</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every industry has unique infrastructure needs. Let's discuss how our experience can help solve your
              specific challenges.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Discuss Your Industry Needs</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
