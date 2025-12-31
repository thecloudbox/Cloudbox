import Link from "next/link"
import { CloudboxLogo } from "@/components/cloudbox-logo"

export function SiteFooter() {
  const footerLinks = {
    Services: [
      { name: "DevOps Engineering", href: "/services#devops" },
      { name: "Managed Services", href: "/services#managed-services" },
      { name: "Cloud Migration", href: "/services#cloud-migration" },
      { name: "Infrastructure as Code", href: "/services#iac" },
      { name: "Cost Optimization", href: "/services#cost-optimization" },
    ],
    Solutions: [
      { name: "All Solutions", href: "/solutions" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "DevOps Tools", href: "/tools" },
      { name: "Partner Program", href: "/partners" },
    ],
    Resources: [
      { name: "Blog", href: "/blog" },
      { name: "Documentation", href: "/docs" },
      { name: "Whitepapers", href: "/resources" },
      { name: "API Reference", href: "/api" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Get Started", href: "/get-started" },
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
            <div className="mt-4 pt-4 border-t">
              <div className="text-xs text-muted-foreground">Trusted by 500+ enterprises</div>
              <div className="text-xs font-mono text-primary mt-1">99.99% uptime SLA</div>
            </div>
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
          <p className="text-sm text-muted-foreground">
            © 2025 TheCloudbox. All rights reserved. <span className="font-mono">$ always-on</span>
          </p>
          <div className="flex items-center gap-6">
            <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              System Status
            </Link>
            <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
