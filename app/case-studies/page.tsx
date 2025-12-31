import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Global FinTech Scales to 10M Daily Transactions",
      industry: "Financial Services",
      challenge:
        "Legacy infrastructure couldn't handle rapid growth, causing frequent outages during peak trading hours",
      solution:
        "Migrated to multi-region AWS architecture with auto-scaling, implemented Kafka for real-time data streaming",
      results: [
        "99.99% uptime achieved",
        "10x transaction capacity increase",
        "60% reduction in infrastructure costs",
        "Sub-100ms p99 latency globally",
      ],
      technologies: ["AWS", "Kubernetes", "Kafka", "PostgreSQL", "Redis"],
      timeline: "3 months",
    },
    {
      title: "Healthcare SaaS Achieves HIPAA Compliance",
      industry: "Healthcare",
      challenge: "Needed to achieve HIPAA compliance while maintaining performance for 2000+ hospitals",
      solution:
        "Built compliant GCP infrastructure with end-to-end encryption, comprehensive audit logging, and automated compliance monitoring",
      results: [
        "HIPAA compliance certified",
        "SOC 2 Type II achieved",
        "Zero security incidents in 2 years",
        "40% faster deployment cycles",
      ],
      technologies: ["GCP", "Terraform", "Vault", "MongoDB", "Elasticsearch"],
      timeline: "4 months",
    },
    {
      title: "E-Commerce Giant Handles Black Friday at Scale",
      industry: "Retail & E-Commerce",
      challenge: "Infrastructure couldn't handle Black Friday traffic spikes, losing millions in revenue",
      solution:
        "Implemented auto-scaling Kubernetes clusters, CDN optimization, and Redis caching layer across multi-cloud",
      results: [
        "5x traffic handled seamlessly",
        "Zero downtime during peak",
        "$12M additional revenue captured",
        "Page load time reduced by 70%",
      ],
      technologies: ["Azure", "Kubernetes", "Redis", "MongoDB", "CloudFlare"],
      timeline: "2 months",
    },
    {
      title: "SaaS Startup Reduces Cloud Spend by 65%",
      industry: "Software & Technology",
      challenge: "Burning through runway with inefficient cloud architecture and no cost visibility",
      solution:
        "Implemented FinOps practices, rightsized resources, moved appropriate workloads to Linode, optimized database queries",
      results: [
        "65% monthly cost reduction",
        "$480K annual savings",
        "18 months runway extension",
        "Better performance despite cost cuts",
      ],
      technologies: ["Linode", "PostgreSQL", "Prometheus", "Grafana"],
      timeline: "6 weeks",
    },
    {
      title: "Media Platform Streams to 50M Concurrent Users",
      industry: "Media & Entertainment",
      challenge: "Existing CDN and streaming infrastructure couldn't support viral content spikes",
      solution:
        "Built global content delivery network with edge caching, implemented adaptive bitrate streaming, Kafka event processing",
      results: [
        "50M concurrent streams supported",
        "99.9% video start success rate",
        "35% bandwidth cost reduction",
        "Global sub-200ms latency",
      ],
      technologies: ["AWS", "CloudFront", "Kafka", "Elasticsearch", "Redis"],
      timeline: "5 months",
    },
    {
      title: "Manufacturing Company Modernizes Legacy Systems",
      industry: "Manufacturing & IoT",
      challenge: "30-year-old on-premise systems needed modernization without disrupting operations",
      solution:
        "Phased migration to hybrid cloud, containerized applications, implemented IoT data pipeline with real-time analytics",
      results: [
        "Zero production downtime",
        "Real-time factory floor visibility",
        "80% faster deployment cycles",
        "30% operational cost savings",
      ],
      technologies: ["Azure", "IoT Hub", "Kubernetes", "TimescaleDB", "Kafka"],
      timeline: "8 months",
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
              <Badge variant="secondary" className="mb-6 font-mono">
                $ success-stories --verified
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Success Stories</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Real results from real companies. See how we've helped organizations across industries transform their
                infrastructure and achieve their business goals.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary">{study.industry}</Badge>
                      <div className="text-sm text-muted-foreground">Timeline: {study.timeline}</div>
                    </div>
                    <CardTitle className="text-2xl mb-3">{study.title}</CardTitle>
                    <CardDescription className="text-base">{study.challenge}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Key Results
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <span className="text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your organization
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
