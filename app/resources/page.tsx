import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Calculator, GitCompare, Download, Video } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const whitepapers = [
    {
      title: "Multi-Cloud Strategy Guide",
      description: "Comprehensive guide to architecting applications across AWS, GCP, and Azure",
      pages: "45 pages",
      category: "Architecture",
    },
    {
      title: "Kafka at Scale: Best Practices",
      description: "Production-tested patterns for running Kafka clusters at enterprise scale",
      pages: "32 pages",
      category: "Message Queuing",
    },
    {
      title: "Zero-Downtime Migration Playbook",
      description: "Step-by-step methodology for migrating critical workloads without service interruption",
      pages: "58 pages",
      category: "Migration",
    },
    {
      title: "AIOps Implementation Framework",
      description: "Transform from reactive to predictive operations with AI-powered monitoring",
      pages: "40 pages",
      category: "AIOps",
    },
    {
      title: "Cost Optimization Strategies",
      description: "Proven techniques to reduce cloud spending by 30-60% without sacrificing performance",
      pages: "28 pages",
      category: "FinOps",
    },
    {
      title: "Security & Compliance Checklist",
      description: "Essential security controls for SOC 2, HIPAA, and PCI-DSS compliance",
      pages: "36 pages",
      category: "Security",
    },
  ]

  const calculators = [
    {
      title: "Cloud Cost Estimator",
      description: "Compare costs across AWS, GCP, Azure, and Linode for your workload",
      icon: Calculator,
    },
    {
      title: "Migration ROI Calculator",
      description: "Calculate the business value and timeline for your cloud migration",
      icon: TrendingUp,
    },
    {
      title: "Kafka Sizing Tool",
      description: "Determine optimal cluster configuration based on throughput requirements",
      icon: GitCompare,
    },
    {
      title: "Database Comparison Tool",
      description: "Compare MongoDB, PostgreSQL, MySQL, and Elasticsearch for your use case",
      icon: GitCompare,
    },
  ]

  const referenceArchitectures = [
    {
      title: "High-Availability E-commerce Platform",
      description: "Multi-region architecture with auto-scaling, caching, and database replication",
      technologies: ["AWS", "Kubernetes", "Redis", "PostgreSQL"],
    },
    {
      title: "Real-time Analytics Pipeline",
      description: "Event streaming architecture with Kafka, Elasticsearch, and data visualization",
      technologies: ["GCP", "Kafka", "Elasticsearch", "Grafana"],
    },
    {
      title: "Microservices on Kubernetes",
      description: "Container orchestration with service mesh, monitoring, and CI/CD",
      technologies: ["Azure", "AKS", "Istio", "ArgoCD"],
    },
    {
      title: "Serverless API Platform",
      description: "Event-driven architecture with managed services and auto-scaling",
      technologies: ["AWS", "Lambda", "API Gateway", "DynamoDB"],
    },
  ]

  const videos = [
    {
      title: "Infrastructure as Code with Terraform",
      duration: "45 min",
      description: "Live workshop on managing multi-cloud infrastructure with Terraform",
    },
    {
      title: "Kubernetes Deep Dive",
      duration: "60 min",
      description: "Production-ready Kubernetes deployment patterns and best practices",
    },
    {
      title: "Observability Stack Setup",
      duration: "35 min",
      description: "Implementing Prometheus, Grafana, and Loki for comprehensive monitoring",
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
                $ resources --learn
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Resource Center</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Technical guides, architecture blueprints, and tools to help you build better infrastructure. All
                resources are free and based on real-world production experience.
              </p>
            </div>
          </div>
        </section>

        {/* Whitepapers */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Whitepapers</h2>
              <p className="text-lg text-muted-foreground">
                In-depth guides covering architecture, migration, and operations
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whitepapers.map((paper, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {paper.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{paper.title}</CardTitle>
                    <CardDescription>{paper.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{paper.pages}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reference Architectures */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Reference Architectures</h2>
              <p className="text-lg text-muted-foreground">
                Production-tested architecture diagrams with Terraform code
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {referenceArchitectures.map((arch, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{arch.title}</CardTitle>
                    <CardDescription>{arch.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {arch.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        View Architecture
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Calculators & Tools */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Calculators & Tools</h2>
              <p className="text-lg text-muted-foreground">Interactive tools to help with planning and decisions</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {calculators.map((calc, index) => {
                const Icon = calc.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{calc.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{calc.description}</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Launch Tool
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Video Content */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Video Tutorials</h2>
              <p className="text-lg text-muted-foreground">Watch our engineers explain complex concepts</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{video.duration}</Badge>
                      <Button size="sm" variant="outline">
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Want More Resources?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our technical newsletter for weekly insights, case studies, and infrastructure tips.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/blog">Read Our Blog</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Request Custom Content</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
