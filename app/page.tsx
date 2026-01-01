import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { services } from "@/lib/services-data"
import { blogPosts } from "@/lib/blog-data"
import { ArrowRight, CheckCircle2, Users, Award, TrendingUp, Database, Cloud, Lock, Zap, Globe } from "lucide-react"

export default function Home() {
  const latestPosts = blogPosts.slice(0, 3)

  const stats = [
    { label: "Enterprise Clients", value: "500+", icon: Users },
    { label: "Uptime SLA", value: "99.99%", icon: TrendingUp },
    { label: "Cloud Certifications", value: "150+", icon: Award },
    { label: "Years of Experience", value: "15+", icon: CheckCircle2 },
  ]

  const cloudProviders = [
    { name: "Amazon Web Services", short: "AWS" },
    { name: "Google Cloud Platform", short: "GCP" },
    { name: "Microsoft Azure", short: "Azure" },
    { name: "Akamai/Linode", short: "Linode" },
  ]

  const technologies = [
    { name: "Kafka", icon: Database },
    { name: "Kubernetes", icon: Cloud },
    { name: "MongoDB", icon: Database },
    { name: "Redis", icon: Zap },
    { name: "PostgreSQL", icon: Database },
    { name: "Elasticsearch", icon: Database },
  ]

  const differentiators = [
    {
      icon: Lock,
      title: "Security-First Architecture",
      description:
        "SOC 2 Type II certified operations with comprehensive compliance coverage for HIPAA, PCI-DSS, and GDPR requirements",
    },
    {
      icon: Zap,
      title: "Proprietary AIOps Platform",
      description:
        "ML-driven predictive monitoring and automated remediation reducing MTTR by 80% and preventing 95% of incidents",
    },
    {
      icon: Globe,
      title: "True Multi-Cloud Expertise",
      description:
        "Certified architects across AWS, GCP, Azure, and Linode with experience optimizing costs through strategic placement",
    },
    {
      icon: Users,
      title: "24/7/365 Expert Support",
      description:
        "Follow-the-sun coverage with 15-minute response time SLA and direct access to senior engineers, not tier-1 support",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-terminal-bg/5 via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
        {/* Terminal-style decorations */}
        <div className="absolute top-20 right-10 opacity-10 hidden lg:block">
          <div className="font-mono text-terminal-green text-5xl leading-tight">
            {"$ cloud init\n> deploying...\n> ████████ 100%"}
          </div>
        </div>
        <div className="absolute bottom-20 left-10 opacity-10 hidden lg:block">
          <div className="font-mono text-terminal-yellow text-6xl font-bold">{"$_"}</div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl">
            <Badge
              variant="secondary"
              className="mb-6 font-mono bg-terminal-bg/10 text-terminal-green border-terminal-green/30"
            >
              <span className="text-terminal-yellow">$</span> enterprise-infrastructure --production-ready
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              Enterprise Infrastructure That Scales With Your Ambition
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty max-w-3xl">
              TheCloudbox delivers expert-managed DevOps, multi-cloud infrastructure, and database operations for
              companies that can't afford downtime. From migration strategy to 24/7 operations, we handle the complexity
              while you focus on building products that matter.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                size="lg"
                asChild
                className="hover:bg-terminal-green hover:border-terminal-green transition-colors"
              >
                <Link href="/get-started">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="hover:border-terminal-green hover:text-terminal-green transition-colors bg-transparent"
              >
                <Link href="/case-studies">View Success Stories</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>24/7 Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">Certified partners across all major cloud platforms</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {cloudProviders.map((provider) => (
                <div
                  key={provider.short}
                  className="text-xl font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {provider.short}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Leading Companies Choose TheCloudbox</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              We're not just another managed services provider. We're infrastructure engineers who've operated systems
              at the world's most demanding scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {differentiators.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg shrink-0 h-fit">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Infrastructure Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              From strategy to execution, we deliver end-to-end infrastructure solutions tailored to your business needs
              and compliance requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group" asChild>
                      <Link href={`/services#${service.slug}`}>
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Managed Database & Infrastructure Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert-managed operations for the technologies powering modern applications
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {technologies.map((tech) => {
              const Icon = tech.icon
              return (
                <Card key={tech.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="font-semibold text-sm">{tech.name}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Button variant="ghost" asChild>
              <Link href="/services#managed-databases">
                View All Managed Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Blog Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Engineering Blog</h2>
              <p className="text-lg text-muted-foreground">
                Deep technical insights on DevOps, AIOps, cloud infrastructure, and database operations from our team of
                expert engineers.
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/blog">
                View all posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{post.date}</span>
                    <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                      Read more
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                View all posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Ready to Transform Your Infrastructure?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Join 500+ enterprises trusting TheCloudbox with their mission-critical infrastructure. Let's discuss how
                we can accelerate your cloud journey with proven expertise and comprehensive managed services.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/case-studies">View Success Stories</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
