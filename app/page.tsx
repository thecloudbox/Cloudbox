import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogoOption1 } from "@/components/logo-option-1"
import { Terminal, Shield, Cloud, Database } from "lucide-react"

export default function TerminalInspiredSite() {
  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-terminal-green/20 bg-terminal-bg/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20">
            <Link href="/" className="flex items-center">
              <LogoOption1 />
            </Link>
          </div>
          <nav className="hidden md:flex items-center justify-center gap-8 pb-4">
            <Link
              href="/services"
              className="text-sm font-mono text-terminal-green hover:text-terminal-yellow transition-colors"
            >
              {">"} services
            </Link>
            <Link
              href="/tools"
              className="text-sm font-mono text-terminal-green hover:text-terminal-yellow transition-colors"
            >
              {">"} tools
            </Link>
            <Link
              href="/blog"
              className="text-sm font-mono text-terminal-green hover:text-terminal-yellow transition-colors"
            >
              {">"} blog
            </Link>
            <Button size="sm" className="bg-terminal-green hover:bg-terminal-yellow text-black font-mono">
              $ get-started
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-black">
        {/* Matrix-style falling text background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 font-mono text-terminal-green text-xs animate-pulse">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-2">
                {"01010101 11001100 10101010 01100110"}
              </div>
            ))}
          </div>
          <div
            className="absolute top-0 right-1/4 font-mono text-terminal-green text-xs animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-2">
                {"11100011 00110011 11001100 00110011"}
              </div>
            ))}
          </div>
        </div>

        {/* Terminal window decoration */}
        <div className="absolute top-20 right-10 hidden lg:block">
          <div className="bg-terminal-bg/80 border-2 border-terminal-green/30 rounded-lg p-6 font-mono text-sm">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-terminal-green">
              <div>$ systemctl status cloudbox</div>
              <div className="text-terminal-yellow mt-2">● Active: running</div>
              <div className="text-terminal-green/70">Uptime: 99.99%</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 bg-terminal-green rounded-full animate-pulse" />
                <span className="text-terminal-green/70 text-xs">monitoring...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="mb-8 font-mono">
              <span className="text-terminal-green text-lg">user@cloudbox:~$</span>
              <span className="text-terminal-yellow ml-2 text-lg">cat mission.txt</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] font-mono">
              <span className="text-terminal-green">{">"}</span> Enterprise Infrastructure
              <br />
              <span className="text-terminal-yellow">That Scales</span>
              <br />
              <span className="text-terminal-green">{">"}</span>{" "}
              <span className="inline-block border-r-4 border-terminal-green animate-pulse">_</span>
            </h1>

            <div className="bg-terminal-bg/50 border-l-4 border-terminal-green p-6 mb-10 font-mono">
              <p className="text-lg text-terminal-green/90 leading-relaxed">
                # DevOps automation + Multi-cloud + Managed databases
                <br /># 500+ enterprises | 99.99% uptime | 24/7 support
                <br />
                <span className="text-terminal-yellow"># Production-ready infrastructure at terminal velocity</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="bg-terminal-green hover:bg-terminal-yellow text-black font-mono h-14 px-8 text-base"
                >
                  $ ./deploy-now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 font-mono h-14 px-8 text-base bg-transparent"
                >
                  {">"} request-demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-12 font-mono text-sm">
              {["SOC-2", "HIPAA", "99.99%", "24/7"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-terminal-green/70">
                  <span className="text-terminal-yellow">{">"}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-black to-terminal-bg/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
              <span className="text-terminal-green">$ ls</span> -la features/
            </h2>
            <p className="text-lg text-terminal-green/70 font-mono">drwxr-xr-x 4 admin enterprise 4096 Jan 1 2024 ./</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Terminal,
                title: "devops-automation",
                description: "CI/CD pipelines, IaC, GitOps workflows",
                permissions: "rwxr-xr-x",
              },
              {
                icon: Cloud,
                title: "multi-cloud",
                description: "AWS, GCP, Azure, Linode certified",
                permissions: "rwxr-xr-x",
              },
              {
                icon: Database,
                title: "managed-databases",
                description: "Kafka, MongoDB, Redis, PostgreSQL 24/7",
                permissions: "rwxr-xr-x",
              },
              {
                icon: Shield,
                title: "security-compliance",
                description: "SOC 2, HIPAA, zero-trust architecture",
                permissions: "rwxr-xr-x",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="bg-terminal-bg/50 border-2 border-terminal-green/30 p-6 hover:border-terminal-yellow/50 hover:shadow-lg hover:shadow-terminal-green/20 transition-all group"
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="font-mono">
                  <div className="flex items-center gap-3 mb-3">
                    <feature.icon className="w-8 h-8 text-terminal-green group-hover:text-terminal-yellow transition-colors" />
                    <span className="text-terminal-green/50 text-xs">{feature.permissions}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-terminal-green mb-2">{feature.title}/</h3>
                  <p className="text-terminal-green/70 text-sm"># {feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-terminal-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-terminal-bg/30 border border-terminal-green/30 rounded-lg p-8 font-mono">
            <div className="text-terminal-green mb-6">$ cat /proc/cloudbox/stats</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "enterprise_clients", value: "500+" },
                { label: "uptime_sla", value: "99.99%" },
                { label: "certifications", value: "150+" },
                { label: "years_exp", value: "15+" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-terminal-yellow text-sm mb-1">{stat.label}:</div>
                  <div className="text-3xl font-bold text-terminal-green">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 to-terminal-yellow/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-terminal-bg/80 border-2 border-terminal-green/30 rounded-lg p-12">
            <div className="font-mono text-terminal-green mb-4">$ sudo deploy production</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-mono">
              Ready to <span className="text-terminal-yellow">./execute</span>?
            </h2>
            <p className="text-lg text-terminal-green/70 mb-10 font-mono">
              # Join 500+ enterprises running mission-critical infrastructure
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/get-started">
                <Button size="lg" className="bg-terminal-green hover:bg-terminal-yellow text-black font-mono h-14 px-8">
                  $ start-free-trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 font-mono h-14 px-8 bg-transparent"
                >
                  {">"} talk-to-expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-terminal-green/20 bg-terminal-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center gap-6">
            <LogoOption1 />
            <span className="text-sm text-terminal-green/50 font-mono text-center">
              © 2026 TheCloudbox | exit status 0
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
