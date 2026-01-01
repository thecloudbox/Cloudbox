import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, Zap, FileCheck } from "lucide-react"
import Link from "next/link"

export default function ConfigDriftPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-6">
                Security & Compliance
              </Badge>
              <h1 className="text-5xl font-bold mb-6">ConfigDrift Scanner</h1>
              <p className="text-2xl text-muted-foreground mb-8">
                Real-Time Multi-Cloud Configuration Drift Detection Across AWS, GCP, Azure, and Linode
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Request Demo</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <Search className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Continuous Monitoring</CardTitle>
                  <CardDescription>
                    Scans your entire cloud infrastructure every 5 minutes to detect configuration changes and policy
                    violations
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Policy Enforcement</CardTitle>
                  <CardDescription>
                    Define security and compliance policies as code, automatically enforce them across all environments
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Auto-Remediation</CardTitle>
                  <CardDescription>
                    Automatically fix common drift issues with pre-approved remediation workflows
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <FileCheck className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Compliance Reporting</CardTitle>
                  <CardDescription>
                    Generate SOC2, HIPAA, and PCI-DSS compliance reports with audit trails and evidence collection
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Multi-Cloud Support</h2>
            <p className="text-lg text-muted-foreground mb-8">
              ConfigDrift Scanner works seamlessly across AWS, Google Cloud, Microsoft Azure, and Linode. Monitor all
              your cloud environments from a single dashboard with unified policies and reporting.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
