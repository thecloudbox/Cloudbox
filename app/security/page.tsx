import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Security | TheCloudbox",
  description: "Enterprise-grade security practices and compliance certifications for cloud infrastructure management",
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 border-b bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <Badge className="mb-4">Security First</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Enterprise-Grade Security You Can Trust
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                TheCloudbox implements industry-leading security practices to protect your infrastructure, data, and
                applications across all cloud platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">Our Security Measures</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-terminal-green mb-4" />
                  <CardTitle>Data Encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    End-to-end encryption for data in transit and at rest using AES-256 and TLS 1.3. All sensitive
                    information is encrypted using industry-standard protocols.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Lock className="h-10 w-10 text-terminal-green mb-4" />
                  <CardTitle>Access Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Role-based access control (RBAC) with multi-factor authentication (MFA) for all administrative
                    access. Principle of least privilege enforced.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Eye className="h-10 w-10 text-terminal-green mb-4" />
                  <CardTitle>Monitoring & Logging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    24/7 security monitoring with real-time threat detection. Comprehensive audit logs retained for
                    compliance and forensic analysis.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileCheck className="h-10 w-10 text-terminal-green mb-4" />
                  <CardTitle>Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    SOC 2 Type II, ISO 27001, HIPAA, and PCI-DSS compliant. Regular third-party audits and penetration
                    testing conducted.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <AlertTriangle className="h-10 w-10 text-terminal-green mb-4" />
                  <CardTitle>Incident Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dedicated security team with 24/7 incident response capabilities. Documented procedures for breach
                    notification and remediation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CheckCircle2 className="h-10 w-10 text-terminal-green mb-4" />
                  <CardTitle>Vulnerability Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Continuous vulnerability scanning and patch management. Automated security updates for all
                    infrastructure components.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 border-t bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Certifications & Compliance</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg border bg-card text-center">
                <h3 className="font-bold text-xl mb-2">SOC 2 Type II</h3>
                <p className="text-sm text-muted-foreground">Security & Availability</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <h3 className="font-bold text-xl mb-2">ISO 27001</h3>
                <p className="text-sm text-muted-foreground">Information Security</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <h3 className="font-bold text-xl mb-2">HIPAA</h3>
                <p className="text-sm text-muted-foreground">Healthcare Data</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <h3 className="font-bold text-xl mb-2">PCI-DSS</h3>
                <p className="text-sm text-muted-foreground">Payment Security</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-6 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Security Questions?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our security team is available to answer any questions about our practices, certifications, or compliance
              requirements.
            </p>
            <p className="text-terminal-green font-mono">security@thecloudbox.com</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
