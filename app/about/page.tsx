import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Globe, Zap, Shield, TrendingUp } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "We stay at the forefront of technology, continuously adopting and mastering emerging tools and practices.",
    },
    {
      icon: Shield,
      title: "Reliability & Security",
      description:
        "Your infrastructure's stability and security are non-negotiable. We build systems designed to never fail.",
    },
    {
      icon: Users,
      title: "Partnership Approach",
      description: "We don't just provide services—we become an extension of your team, invested in your success.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "Every incident, deployment, and interaction is an opportunity to learn and optimize further.",
    },
  ]

  const certifications = [
    "AWS Solutions Architect Professional",
    "Google Cloud Professional Architect",
    "Azure Solutions Architect Expert",
    "Certified Kubernetes Administrator (CKA)",
    "Certified Kubernetes Security Specialist (CKS)",
    "HashiCorp Terraform Associate",
    "MongoDB Certified DBA",
    "Elastic Certified Engineer",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About InfraOps</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're a team of infrastructure experts passionate about building and operating resilient, scalable
                systems that power modern businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded in 2010, InfraOps began when a group of senior infrastructure engineers recognized a critical
                gap in the market: businesses needed expert-level infrastructure management without the overhead of
                building entire DevOps teams from scratch.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Over the past 15 years, we've grown from a small consulting team to a comprehensive managed services
                provider, supporting over 500 enterprise clients across industries. We've managed infrastructure
                migrations for Fortune 500 companies, built resilient platforms processing billions of events daily, and
                helped startups scale from zero to millions of users.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we combine deep technical expertise with proven operational excellence to deliver infrastructure
                solutions that just work. Our team of certified cloud architects, SREs, and DevOps engineers brings
                decades of collective experience managing infrastructure at scale.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision, deployment, and client interaction.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats & Expertise */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold mb-6">Proven Expertise</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">120+ Engineers</div>
                      <p className="text-muted-foreground">
                        Expert DevOps engineers, SREs, and cloud architects across three continents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">500+ Enterprise Clients</div>
                      <p className="text-muted-foreground">
                        Supporting organizations from fast-growing startups to Fortune 500 companies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">150+ Certifications</div>
                      <p className="text-muted-foreground">
                        Team-wide expertise across all major cloud platforms and technologies
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">Team Certifications Include:</h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented engineers who are passionate about infrastructure and operations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/careers"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
