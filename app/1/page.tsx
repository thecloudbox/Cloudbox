import { LogoOption1 } from "@/components/logo-option-1"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Terminal, Zap, Shield, Code2 } from "lucide-react"

export default function LogoDemo1() {
  return (
    <div className="min-h-screen bg-[#0d0e14]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1d29] via-[#0d0e14] to-[#0d0e14]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
              <Terminal className="w-4 h-4" />
              Terminal-First Design
            </div>

            <h1 className="text-6xl font-bold text-white tracking-tight">
              Make infrastructure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                easily accessible at scale
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Give platform teams the power to deliver golden patterns and workflows through a developer-first terminal
              interface that scales with your ambition.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/get-started">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 bg-transparent"
                >
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-2xl">
              <Card className="bg-[#1a1d29] border-slate-800 p-12">
                <div className="flex justify-center">
                  <LogoOption1 />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Terminal,
              title: "Developer-Focused",
              description: "Command prompt with $ thecloud init for instant recognition",
            },
            {
              icon: Code2,
              title: "Clean Interface",
              description: "Terminal window with colored control dots (red, yellow, green)",
            },
            {
              icon: Zap,
              title: "Interactive",
              description: "Blinking cursor and hover effects with sea green accents",
            },
            {
              icon: Shield,
              title: "Professional",
              description: "Simple, technical aesthetic that resonates with DevOps teams",
            },
          ].map((feature, i) => (
            <Card key={i} className="bg-[#1a1d29] border-slate-800 p-6 hover:border-emerald-500/50 transition-all">
              <feature.icon className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 bg-[#1a1d29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                ← Back to Home
              </Button>
            </Link>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <Link key={num} href={`/${num}`}>
                  <Button
                    variant={num === 1 ? "default" : "outline"}
                    size="sm"
                    className={
                      num === 1
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                    }
                  >
                    {num}
                  </Button>
                </Link>
              ))}
            </div>
            <Link href="/2">
              <Button className="bg-emerald-500 hover:bg-emerald-600">Next Option →</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
