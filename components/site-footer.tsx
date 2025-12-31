import Link from "next/link"
import { CloudboxLogo } from "@/components/cloudbox-logo"

export function SiteFooter() {
  const footerLinks = {
    Services: [
      { name: "DevOps Engineering", href: "/services#devops" },
      { name: "Managed Services", href: "/services#managed-services" },
      { name: "Cloud Migration", href: "/services#cloud-migration" },
      { name: "Cost Optimization", href: "/services#cost-optimization" },
    ],
    Resources: [
      { name: "Blog", href: "/blog" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/partners" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security", href: "/security" },
    ],
  }

  return (
    <footer className="border-t bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <CloudboxLogo />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise-grade DevOps and managed infrastructure services for modern cloud platforms.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 TheCloudbox. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              System Status
            </Link>
            <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
