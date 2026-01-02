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
      <nav className="container mx-auto px-6 h-16 flex items-center">
        {/* Logo - Left aligned */}
        <div className="flex items-center mr-8">
          <Link href="/" className="flex items-center">
            <LogoOption1 compact />
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center gap-6 flex-1">
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

        {/* Actions - Right aligned */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/get-started">$ get-started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
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
