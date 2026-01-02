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
    <header className="sticky top-0 z-50 w-full border-b bg-[#0d0e14]/95 border-slate-800 backdrop-blur supports-[backdrop-filter]:bg-[#0d0e14]/60">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center flex-shrink-0">
          <LogoOption1 />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-emerald-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-6 border-t">
                <Button variant="ghost" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
                <Button asChild>
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
