"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogoOption1 } from "@/components/logo-option-1"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Tools", href: "/tools" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Partners", href: "/partners" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ]

  return (
    <header className="border-b border-terminal-green/20 bg-terminal-bg/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <LogoOption1 />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-mono text-terminal-green hover:text-terminal-yellow transition-colors"
              >
                {">"} {item.name.toLowerCase()}
              </Link>
            ))}
            <Button size="sm" className="bg-terminal-green hover:bg-terminal-yellow text-black font-mono">
              $ get-started
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-terminal-green">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-terminal-bg border-terminal-green/20">
              <div className="flex flex-col gap-6 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-mono text-terminal-green hover:text-terminal-yellow transition-colors"
                  >
                    {">"} {item.name.toLowerCase()}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-6 border-t border-terminal-green/20">
                  <Button asChild className="bg-terminal-green hover:bg-terminal-yellow text-black font-mono">
                    <Link href="/get-started">$ get-started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
