import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Award, Layers, Users } from "lucide-react"
import Link from "next/link"

export default function PartnersPage() {
  const clientExperience = [
    {
      name: "Paytm",
      industry: "FinTech",
      services: ["AWS Migration", "Kafka Infrastructure", "DevOps Automation"],
      description: "Architected and migrated payment processing infrastructure handling millions of transactions",
      scale: "High-volume payment processing",
    },
    {
      name: "Gojek",
      industry: "Ride-hailing & Super App",
      services: ["Multi-cloud Strategy", "Microservices Migration", "Observability Platform"],
      description: "Implemented scalable infrastructure across multiple regions for ride-hailing and delivery services",
      scale: "Multi-region deployment",
    },
    {
      name: "IRCTC",
      industry: "Transportation & E-commerce",
      services: ["Cloud Migration", "High-availability Architecture", "Performance Optimization"],
      description: "Modernized railway ticketing platform to handle massive traffic spikes during booking windows",
      scale: "Millions of concurrent users",
    },
    {
      name: "Mystifly",
      industry: "Travel Technology",
      services: ["GCP Migration", "MongoDB Optimization", "API Gateway Setup"],
      description: "Built robust travel booking infrastructure with global distribution system integration",
      scale: "Global flight search aggregation",
    },
    {
      name: "Part+",
      industry: "Healthcare Technology",
      services: ["HIPAA-compliant Infrastructure", "Database Management", "Security Hardening"],
      description: "Designed secure, compliant healthcare data platform with end-to-end encryption",
      scale: "Healthcare data compliance",
    },
  ]

  const cloudExpertise = [
    {
      name: "Amazon Web Services",
      experience: "7+ Years",
      specializations: ["EC2, ECS, EKS", "RDS, Aurora, DynamoDB", "Lambda, API Gateway", "CloudFormation, CDK"],
      certifications: ["Solutions Architect Professional", "DevOps Engineer Professional"],
    },
    {
      name: "Google Cloud Platform",
      experience: "5+ Years",
      specializations: ["Compute Engine, GKE", "Cloud SQL, BigQuery", "Cloud Functions, Pub/Sub", "Deployment Manager"],
      certifications: ["Professional Cloud Architect", "Professional DevOps Engineer"],
    },
    {
      name: "Microsoft Azure",
      experience: "6+ Years",
      specializations: [
        "Virtual Machines, AKS",
        "Azure SQL, Cosmos DB",
        "Azure Functions, Logic Apps",
        "ARM Templates",
      ],
      certifications: ["Azure Solutions Architect Expert", "Azure DevOps Engineer Expert"],
    },
    {
      name: "Akamai/Linode",
      experience: "4+ Years",
      specializations: ["Compute Instances", "Kubernetes Engine", "Object Storage", "NodeBalancers"],
      certifications: ["Infrastructure Specialist"],
    },
  ]

  const technologyStack = [
    { category: "Message Queuing", technologies: ["Apache Kafka", "RabbitMQ", "AWS SQS", "Google Pub/Sub"] },
    { category: "Databases", technologies: ["MongoDB", "MySQL", "PostgreSQL", "Elasticsearch", "Redis"] },
    { category: "Orchestration", technologies: ["Kubernetes", "Docker Swarm", "ECS", "Nomad"] },
    { category: "IaC Tools", technologies: ["Terraform", "Ansible", "CloudFormation", "Pulumi"] },
    { category: "CI/CD", technologies: ["Jenkins", "GitLab CI", "GitHub Actions", "ArgoCD"] },
    { category: "Monitoring", technologies: ["Prometheus", "Grafana", "Datadog", "New Relic", "ELK Stack"] },
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
                $ experience --enterprise-grade
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Proven Experience</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Trusted by leading companies across industries for mission-critical infrastructure. We've architected,
                migrated, and managed cloud platforms serving millions of users globally.
              </p>
            </div>
          </div>
        </section>

        {/* Client Experience */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Companies We've Worked With</h2>
              <p className="text-lg text-muted-foreground">
                Real-world infrastructure projects with industry-leading organizations
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {clientExperience.map((client, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-2xl mb-1">{client.name}</CardTitle>
                        <Badge variant="secondary" className="mb-3">
                          {client.industry}
                        </Badge>
                      </div>
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <CardDescription className="text-base">{client.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Services Delivered:</p>
                        <div className="flex flex-wrap gap-2">
                          {client.services.map((service, idx) => (
                            <Badge key={idx} variant="outline">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Scale:</span> {client.scale}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cloud Expertise */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Multi-Cloud Expertise</h2>
              <p className="text-lg text-muted-foreground">
                Deep technical knowledge across all major cloud platforms with certified engineers
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {cloudExpertise.map((cloud, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{cloud.name}</CardTitle>
                      <Badge>{cloud.experience}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Core Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {cloud.specializations.map((spec, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        Team Certifications:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {cloud.certifications.map((cert, idx) => (
                          <li key={idx}>• {cert}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive expertise across the modern infrastructure ecosystem
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {technologyStack.map((stack, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{stack.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Work With Our Expert Team</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Leverage our proven experience across industries and cloud platforms. Let's discuss how we can help
                scale your infrastructure.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
