import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, FileCheck, Eye, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function CompliancePage() {
  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Security, availability, and confidentiality controls audited annually",
      icon: Shield,
      scope: "Infrastructure operations and managed services",
    },
    {
      name: "ISO 27001",
      description: "Information security management system certification",
      icon: Lock,
      scope: "Organization-wide security practices",
    },
    {
      name: "HIPAA Compliance",
      description: "Healthcare data protection and privacy standards",
      icon: FileCheck,
      scope: "Healthcare industry clients",
    },
    {
      name: "PCI-DSS Level 1",
      description: "Payment card industry data security standard",
      icon: Shield,
      scope: "Payment processing infrastructure",
    },
  ]

  const securityControls = [
    {
      category: "Data Protection",
      controls: [
        "AES-256 encryption at rest",
        "TLS 1.3 encryption in transit",
        "Key management with HSM",
        "Regular encryption audits",
      ],
    },
    {
      category: "Access Control",
      controls: [
        "Multi-factor authentication (MFA)",
        "Role-based access control (RBAC)",
        "Principle of least privilege",
        "Regular access reviews",
      ],
    },
    {
      category: "Network Security",
      controls: [
        "Virtual Private Cloud (VPC) isolation",
        "Web application firewalls (WAF)",
        "DDoS protection",
        "Intrusion detection systems (IDS)",
      ],
    },
    {
      category: "Monitoring & Logging",
      controls: [
        "Centralized log aggregation",
        "Real-time security alerting",
        "SIEM integration",
        "Audit trail retention (7 years)",
      ],
    },
    {
      category: "Incident Response",
      controls: [
        "24/7 security operations center",
        "Documented incident response plan",
        "Regular security drills",
        "Breach notification procedures",
      ],
    },
    {
      category: "Vulnerability Management",
      controls: [
        "Automated security patching",
        "Quarterly penetration testing",
        "Continuous vulnerability scanning",
        "Responsible disclosure program",
      ],
    },
  ]

  const complianceServices = [
    {
      title: "Compliance Assessment",
      description: "Evaluate your current infrastructure against regulatory requirements",
      deliverables: ["Gap analysis report", "Remediation roadmap", "Cost estimates", "Timeline projections"],
    },
    {
      title: "Compliance Implementation",
      description: "Build compliant infrastructure with proper controls and documentation",
      deliverables: [
        "Security controls implementation",
        "Policy and procedure documentation",
        "Employee training materials",
        "Audit support",
      ],
    },
    {
      title: "Ongoing Compliance Management",
      description: "Maintain compliance with continuous monitoring and reporting",
      deliverables: [
        "Monthly compliance reports",
        "Quarterly audits",
        "Change management support",
        "Regulator communication",
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 font-mono">
                $ compliance --enterprise-grade
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Security & Compliance</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Enterprise-grade security controls and compliance certifications. We help you build and maintain
                infrastructure that meets the strictest regulatory requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Compliance Certifications</h2>
              <p className="text-lg text-muted-foreground">Independently audited and verified compliance frameworks</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{cert.name}</CardTitle>
                          <CardDescription className="text-base mb-3">{cert.description}</CardDescription>
                          <Badge variant="outline">Scope: {cert.scope}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Security Controls */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Security Controls</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive security measures protecting your infrastructure
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityControls.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.controls.map((control, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{control}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Services */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Compliance Services</h2>
              <p className="text-lg text-muted-foreground">
                End-to-end support for achieving and maintaining compliance
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {complianceServices.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="text-sm font-semibold mb-2">Deliverables:</p>
                      <ul className="space-y-1">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Center */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Trust Center</CardTitle>
                  <CardDescription>
                    Transparency into our security practices, compliance status, and audit reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Available Documents</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• SOC 2 Type II Report</li>
                        <li>• ISO 27001 Certificate</li>
                        <li>• Penetration Test Reports</li>
                        <li>• Security Whitepaper</li>
                        <li>• Data Processing Agreement</li>
                        <li>• Business Associate Agreement (BAA)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Security Practices</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Regular third-party audits</li>
                        <li>• Bug bounty program</li>
                        <li>• Security awareness training</li>
                        <li>• Incident response 24/7</li>
                        <li>• Data backup and recovery</li>
                        <li>• Business continuity planning</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Button size="lg" asChild>
                      <Link href="/contact">Request Trust Center Access</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Compliance Support?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your compliance requirements and create a roadmap to achieve certification.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Schedule Compliance Consultation</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
