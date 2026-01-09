import Link from "next/link"
import { LogoOption1 } from "@/components/logo-option-1"

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
    <footer className="border-t border-terminal-green/20 bg-terminal-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and description */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-4">
            <LogoOption1 />
          </Link>
          <p className="text-sm text-terminal-green/70 font-mono max-w-md">
            Enterprise-grade DevOps and managed infrastructure services for modern cloud platforms.
          </p>
          <div className="mt-4 pt-4 border-t border-terminal-green/20">
            <div className="text-xs text-terminal-green/50 font-mono">Trusted by 500+ enterprises</div>
            <div className="text-xs font-mono text-terminal-green mt-1">99.99% uptime SLA</div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-terminal-green mb-4 font-mono">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-terminal-green/70 hover:text-terminal-yellow transition-colors font-mono"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-terminal-green/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-terminal-green/50 font-mono">© 2026 TheCloudbox | exit status 0</p>
          <div className="flex items-center gap-6">
            <Link
              href="/status"
              className="text-sm text-terminal-green/70 hover:text-terminal-yellow transition-colors font-mono"
            >
              System Status
            </Link>
            <Link
              href="/security"
              className="text-sm text-terminal-green/70 hover:text-terminal-yellow transition-colors font-mono"
            >
              Security
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-terminal-green/70 hover:text-terminal-yellow transition-colors font-mono"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
