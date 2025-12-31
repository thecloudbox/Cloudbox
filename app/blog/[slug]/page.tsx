import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts } from "@/lib/blog-data"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Mail, Phone } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | TheCloudbox Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Back Button */}
        <div className="border-b bg-card/30">
          <div className="container mx-auto px-6 py-4">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge variant="secondary">{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <div>
                    <div className="font-medium text-foreground">{post.author.name}</div>
                    <div className="text-xs">{post.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-8 rounded-lg overflow-hidden border">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-12 mb-4 text-balance">
                      {paragraph.replace("## ", "")}
                    </h2>
                  )
                }
                if (paragraph.startsWith("**") && paragraph.includes("**")) {
                  const parts = paragraph.split("**")
                  return (
                    <p key={index} className="mb-6 leading-relaxed text-pretty">
                      {parts.map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="font-semibold text-foreground">
                            {part}
                          </strong>
                        ) : (
                          part
                        ),
                      )}
                    </p>
                  )
                }
                return (
                  <p key={index} className="mb-6 leading-relaxed text-pretty">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            {/* Section Images */}
            {post.sections && post.sections.length > 0 && (
              <div className="mt-12 space-y-8">
                {post.sections.map((section, index) => (
                  <div key={index} className="rounded-lg border p-6 bg-card">
                    <h3 className="text-xl font-semibold mb-4">{section.heading}</h3>
                    {section.image && (
                      <img
                        src={section.image || "/placeholder.svg"}
                        alt={section.heading}
                        className="w-full h-auto rounded-lg mb-4"
                        loading="lazy"
                      />
                    )}
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            )}

            <Card className="mt-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">Ready to Transform Your Infrastructure?</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Let TheCloudbox help you implement these best practices. Our team of experts has delivered solutions
                    for Paytm, Gojek, IRCTC, and more. Get a free consultation today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button size="lg" asChild className="group">
                      <Link href="/contact">
                        Schedule Consultation
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/services">
                        <Mail className="mr-2 h-4 w-4" />
                        View Our Services
                      </Link>
                    </Button>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="hidden sm:block">•</div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>contact@thecloudbox.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 border-t bg-muted/30">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block p-4 rounded-lg border bg-card hover:shadow-lg hover:border-sea-green transition-all"
                  >
                    <Badge variant="secondary" className="mb-3">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-semibold mb-2 group-hover:text-sea-green transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{relatedPost.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 border-t">
          <div className="container mx-auto px-6 max-w-4xl">
            <Card className="border-2">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3">Stay Updated with DevOps Insights</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Subscribe to our newsletter for weekly updates on AIOps, cloud migrations, and infrastructure best
                  practices.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button type="submit">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
