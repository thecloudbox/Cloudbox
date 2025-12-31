import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/blog-data"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

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
                // Check if it's a heading
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-12 mb-4 text-balance">
                      {paragraph.replace("## ", "")}
                    </h2>
                  )
                }
                // Check if it's a bold paragraph (starts with **)
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
                    className="group block p-4 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                  >
                    <Badge variant="secondary" className="mb-3">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{relatedPost.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
