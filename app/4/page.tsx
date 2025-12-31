import { LogoOption4 } from "@/components/logo-option-4"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LogoDemo4() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12">
        {/* Logo Display */}
        <div className="flex flex-col items-center justify-center space-y-8 bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-12">
          <h1 className="text-3xl font-bold text-white mb-4">Option 4: Circuit Cloud</h1>
          <LogoOption4 />

          <div className="mt-8 text-center space-y-4">
            <p className="text-slate-300 text-lg">Cloud shape made of circuit board traces</p>
            <ul className="text-slate-400 space-y-2 text-left max-w-md">
              <li>✓ Cloud shape made of circuit board traces</li>
              <li>✓ Blue lines with connection nodes</li>
              <li>✓ Modern, tech-forward aesthetic</li>
              <li>✓ Blends cloud + infrastructure concepts</li>
              <li>✓ Pulse effect radiates on hover</li>
              <li>✓ Perfect for AI/ML infrastructure branding</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/3">
            <Button variant="outline">← Previous</Button>
          </Link>
          <div className="flex gap-2">
            <Link href="/1">
              <Button variant="outline">1</Button>
            </Link>
            <Link href="/2">
              <Button variant="outline">2</Button>
            </Link>
            <Link href="/3">
              <Button variant="outline">3</Button>
            </Link>
            <Link href="/4">
              <Button variant="default">4</Button>
            </Link>
            <Link href="/5">
              <Button variant="outline">5</Button>
            </Link>
          </div>
          <Link href="/5">
            <Button>Next Option →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
