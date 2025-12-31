import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { services } from "@/lib/services-data"
import { blogPosts } from "@/lib/blog-data"
import { ArrowRight, CheckCircle2, Users, Award, TrendingUp, Terminal } from "lucide-react"

export default function Home() {
  const latestPosts = blogPosts.slice(0, 3)

  const stats = [
    { label: "Enterprise Clients", value: "500+", icon: Users },
    { label: "Uptime SLA", value: "99.99%", icon: TrendingUp },
    { label: "Cloud Certifications", value: "150+", icon: Award },
    { label: "Years of Experience", value: "15+", icon: CheckCircle2 },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 right-10 opacity-5 hidden lg:block">
          <Terminal className="h-64 w-64" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-5 hidden lg:block">
          <div className="font-mono text-6xl">$_</div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6 font-mono">
              $ enterprise-infrastructure --ready
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              Scale Your Infrastructure with Confidence
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              Expert DevOps, managed services, and cloud infrastructure solutions for modern enterprises. From migration
              to optimization, we handle the complexity so you can focus on innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/get-started">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">View Services</Link>
              </Button>
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

      {/* Services Overview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Infrastructure Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              From strategy to execution, we deliver end-to-end infrastructure solutions tailored to your business
              needs.
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

      {/* Tech Blog Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
              <p className="text-lg text-muted-foreground">
                Expert insights on DevOps, cloud infrastructure, and modern operations.
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
                Let's discuss how we can help you achieve your infrastructure goals with our proven expertise and
                comprehensive services.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/case-studies">View Case Studies</Link>
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
