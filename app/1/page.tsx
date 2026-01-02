import { LogoOption2 } from "@/components/logo-option-2"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Terminal, Shield, Cloud, Database, TrendingUp, CheckCircle2 } from "lucide-react"

export default function HashiCorpStyleSite() {
  return (
    <div className="min-h-screen bg-[#0d0e14]">
      <header className="border-b border-slate-800 bg-[#1a1d29]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <LogoOption2 />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/services" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                Services
              </Link>
              <Link href="/tools" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                Tools
              </Link>
              <Link href="/blog" className="text-sm text-slate-300 hover:text-emerald-400 transition-colors">
                Blog
              </Link>
              <Link href="/contact">
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d29] via-[#0d0e14] to-[#0d0e14]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />

        <div className="absolute top-20 right-10 opacity-5 font-mono text-emerald-500/50">
          <pre className="text-xs">
            {`$ deploy --cloud production
✓ Analyzing infrastructure...
✓ Optimizing resources...
✓ Deployment complete
████████████████ 100%`}
          </pre>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
              <Terminal className="w-3 h-3 mr-2" />
              Enterprise Infrastructure
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Make infrastructure
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400">
                easily accessible at scale
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
              Give platform teams the power to deliver golden patterns and workflows through a developer-first interface
              that scales with your ambition. Production-ready DevOps for enterprise.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/get-started">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12 text-base">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 bg-transparent h-12 px-8 text-base"
                >
                  Request a Demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-12 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>99.99% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-[#0d0e14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need for modern infrastructure
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Comprehensive platform for DevOps, multi-cloud, and database operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Terminal,
                title: "DevOps Automation",
                description: "CI/CD pipelines, IaC, and GitOps workflows that scale",
              },
              {
                icon: Cloud,
                title: "Multi-Cloud",
                description: "AWS, GCP, Azure, and Linode expertise in one platform",
              },
              {
                icon: Database,
                title: "Managed Databases",
                description: "Kafka, MongoDB, Redis, PostgreSQL operations 24/7",
              },
              {
                icon: Shield,
                title: "Security First",
                description: "SOC 2, HIPAA compliant with zero-trust architecture",
              },
            ].map((feature, i) => (
              <Card key={i} className="bg-[#1a1d29] border-slate-800 p-6 hover:border-emerald-500/30 transition-all">
                <feature.icon className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-slate-800 bg-[#1a1d29]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Enterprise Clients", value: "500+", icon: TrendingUp },
              { label: "Uptime SLA", value: "99.99%", icon: CheckCircle2 },
              { label: "Cloud Certified", value: "150+", icon: Cloud },
              { label: "Years Experience", value: "15+", icon: Shield },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#1a1d29] to-[#0d0e14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your infrastructure?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 500+ enterprises trusting TheCloudbox with mission-critical operations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/get-started">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-12">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800 h-12 px-8 bg-transparent"
              >
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#1a1d29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <LogoOption2 />
              <span className="text-sm text-slate-500">© 2026 TheCloudbox. All rights reserved.</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Link key={num} href={`/${num}`}>
                  <Button
                    variant={num === 1 ? "default" : "ghost"}
                    size="sm"
                    className={num === 1 ? "bg-emerald-500 hover:bg-emerald-600" : "text-slate-400 hover:text-white"}
                  >
                    {num}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
