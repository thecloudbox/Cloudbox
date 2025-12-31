import { LogoOption5 } from "@/components/logo-option-5"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LogoDemo5() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12">
        {/* Logo Display */}
        <div className="flex flex-col items-center justify-center space-y-8 bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-12">
          <h1 className="text-3xl font-bold text-white mb-4">Option 5: Infrastructure Stack</h1>
          <LogoOption5 />

          <div className="mt-8 text-center space-y-4">
            <p className="text-slate-300 text-lg">Layered infrastructure stack with terminal integration</p>
            <ul className="text-slate-400 space-y-2 text-left max-w-md">
              <li>✓ Horizontal layered lines (representing stack layers)</li>
              <li>
                ✓ Terminal prompt integrated: <code className="text-blue-400">$ _</code>
              </li>
              <li>✓ Each layer slightly offset (isometric style)</li>
              <li>✓ Blue gradient across layers</li>
              <li>✓ Represents full-stack infrastructure</li>
              <li>✓ Blinking cursor on base layer</li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/4">
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
              <Button variant="outline">4</Button>
            </Link>
            <Link href="/5">
              <Button variant="default">5</Button>
            </Link>
          </div>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
