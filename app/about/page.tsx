import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Globe, Zap, Shield, TrendingUp, Target, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Zap,
      title: "Innovation-Driven Excellence",
      description:
        "We don't just implement existing solutions—we pioneer new approaches. Our team stays at the absolute forefront of infrastructure technology, continuously adopting emerging tools and developing proprietary solutions that give our clients competitive advantages.",
    },
    {
      icon: Shield,
      title: "Security & Reliability First",
      description:
        "Your infrastructure's stability and security are non-negotiable. We architect systems with defense-in-depth principles, implement comprehensive monitoring, and maintain 99.99% SLA commitments. Every design decision prioritizes resilience and compliance.",
    },
    {
      icon: Heart,
      title: "True Partnership Approach",
      description:
        "We don't operate as vendors—we become strategic extensions of your engineering teams. Our success is measured by your success. We're invested in your long-term growth, providing guidance that sometimes means recommending against services that would benefit us financially.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement Culture",
      description:
        "Every incident is a learning opportunity. Every deployment is analyzed for optimization potential. We conduct blameless post-mortems, maintain comprehensive runbooks, and systematically eliminate toil through intelligent automation.",
    },
    {
      icon: Target,
      title: "Business-Outcome Focus",
      description:
        "We speak both engineer and executive. Our recommendations balance technical excellence with business reality—considering time-to-market, cost constraints, and organizational readiness. Technology serves business goals, not the reverse.",
    },
    {
      icon: Globe,
      title: "Multi-Cloud Expertise",
      description:
        "True cloud-agnostic capabilities across AWS, GCP, Azure, and alternative providers like Linode. We help you avoid vendor lock-in while optimizing costs through strategic multi-cloud architectures and workload placement strategies.",
    },
  ]

  const certifications = [
    "AWS Solutions Architect Professional",
    "AWS DevOps Engineer Professional",
    "Google Cloud Professional Architect",
    "Google Cloud Professional DevOps Engineer",
    "Azure Solutions Architect Expert",
    "Azure DevOps Engineer Expert",
    "Certified Kubernetes Administrator (CKA)",
    "Certified Kubernetes Security Specialist (CKS)",
    "HashiCorp Terraform Associate",
    "HashiCorp Vault Associate",
    "MongoDB Certified DBA Associate",
    "MongoDB Certified Developer",
    "Elastic Certified Engineer",
    "Redis Certified Architect",
    "Confluent Certified Administrator for Apache Kafka",
    "CISSP - Certified Information Systems Security Professional",
  ]

  const milestones = [
    { year: "2010", event: "TheCloudbox founded by three senior infrastructure engineers" },
    { year: "2012", event: "Achieved AWS Advanced Consulting Partner status" },
    { year: "2014", event: "Expanded to 50+ engineers, opened second office" },
    { year: "2016", event: "Managed first billion-event-per-day Kafka cluster" },
    { year: "2018", event: "Launched proprietary AIOps tooling suite" },
    { year: "2020", event: "Surpassed 500 enterprise clients milestone" },
    { year: "2022", event: "Achieved Google Cloud Premier Partner status" },
    { year: "2024", event: "Expanded to 120+ engineers across three continents" },
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
                $ company-profile --detailed
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About TheCloudbox</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're a team of world-class infrastructure engineers passionate about building and operating resilient,
                scalable systems that power the modern digital economy.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                TheCloudbox was born in 2010 from a simple observation: as cloud infrastructure became increasingly
                complex, most companies were struggling to hire, train, and retain the specialized talent needed to run
                production systems reliably. Three senior engineers from leading tech companies—veterans of scaling
                challenges at companies processing billions of requests daily—decided to build a different kind of
                infrastructure company.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Rather than following the typical "staff augmentation" model, we built a true managed services practice
                focused on operational excellence. Our founding principle: we should operate infrastructure for clients
                as if we were paying for the servers ourselves—with extreme care for cost efficiency, security, and
                reliability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over the past 15 years, we've evolved from a boutique consultancy into a comprehensive infrastructure
                partner, now supporting over 500 enterprise clients across industries. We've managed some of the most
                demanding workloads in production: financial trading platforms processing millions of transactions per
                second, healthcare systems handling sensitive patient data for thousands of hospitals, e-commerce
                platforms surviving Black Friday traffic spikes, and global streaming services delivering content to
                tens of millions of concurrent users.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, TheCloudbox combines deep technical expertise with proven operational excellence. Our team of
                120+ certified cloud architects, SREs, and DevOps engineers brings decades of collective experience
                managing infrastructure at scale. We've built proprietary tools, developed best practices through
                hard-won experience, and established ourselves as trusted partners to some of the world's most demanding
                organizations.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8">Key Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="font-mono text-sm font-bold text-primary min-w-[60px]">{milestone.year}</div>
                    <div className="text-muted-foreground">{milestone.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every architectural decision, deployment, and client interaction
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg w-fit">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
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
                <h2 className="text-3xl font-bold mb-8">Proven At Scale</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">120+ Engineers</div>
                      <p className="text-muted-foreground">
                        Expert DevOps engineers, SREs, and cloud architects across three continents providing 24/7/365
                        coverage
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">500+ Enterprise Clients</div>
                      <p className="text-muted-foreground">
                        Supporting organizations from fast-growing startups to Fortune 500 companies across financial
                        services, healthcare, e-commerce, SaaS, and media
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">150+ Certifications</div>
                      <p className="text-muted-foreground">
                        Team-wide expertise across all major cloud platforms, databases, and infrastructure technologies
                        with continuous certification maintenance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">99.99% Uptime SLA</div>
                      <p className="text-muted-foreground">
                        Consistently exceeding our SLA commitments with comprehensive incident response and proactive
                        monitoring
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Team Certifications Include:</h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  All certifications are maintained through continuous learning and re-certification. Our engineers
                  dedicate 10% of their time to training and skill development.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
