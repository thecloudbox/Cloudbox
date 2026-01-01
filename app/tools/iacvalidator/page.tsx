import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitBranch, CheckCircle2, ArrowRight, Shield, DollarSign, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "IaCValidator - Terraform & CloudFormation Testing | TheCloudbox",
  description:
    "Comprehensive infrastructure-as-code validation that catches errors before deployment with security, cost, and compliance testing",
}

export default function IaCValidatorPage() {
  const validations = [
    {
      icon: Shield,
      title: "Security Scanning",
      description: "Detect security vulnerabilities, exposed secrets, and insecure configurations before deployment",
    },
    {
      icon: DollarSign,
      title: "Cost Analysis",
      description: "Preview infrastructure costs and identify expensive resources before they're provisioned",
    },
    {
      icon: Zap,
      title: "Performance Testing",
      description: "Validate resource sizing, network configurations, and performance characteristics",
    },
  ]

  const features = [
    "Support for Terraform, CloudFormation, and Pulumi",
    "Pre-deployment validation and testing",
    "Cost impact analysis before apply",
    "Security vulnerability scanning (OWASP, CIS benchmarks)",
    "Policy compliance checking (SOC2, HIPAA, PCI-DSS)",
    "Drift detection between code and deployed infrastructure",
    "CI/CD pipeline integration",
    "Custom policy enforcement with OPA",
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 border-sea-green/50 text-sea-green">
              Available Now
            </Badge>
            <h1 className="mb-6 text-5xl font-bold">
              IaC<span className="text-primary">Validator</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Comprehensive infrastructure-as-code validation that catches security, cost, and compliance issues before
              deployment
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
                <Link href="/get-started">
                  Start Validating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {validations.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card key={idx}>
                  <CardHeader>
                    <Icon className="mb-2 h-8 w-8 text-sea-green" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Catch Issues Before Deployment</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prevent Production Incidents</CardTitle>
                  <CardDescription>Stop bad configurations from reaching production environments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    IaCValidator runs comprehensive tests on your infrastructure code, identifying misconfigurations,
                    security vulnerabilities, and compliance violations before they cause outages or security breaches
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Reduce Cloud Costs</CardTitle>
                  <CardDescription>Know the cost impact before provisioning resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get accurate cost estimates for your infrastructure changes, identify over-provisioned resources,
                    and receive recommendations for cost optimization before you deploy
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enforce Compliance</CardTitle>
                  <CardDescription>Automatically validate against industry standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Built-in policies for SOC2, HIPAA, PCI-DSS, and CIS benchmarks. Create custom policies using Open
                    Policy Agent (OPA) to enforce your organization's standards
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Complete Feature Set</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-sea-green" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <GitBranch className="mx-auto mb-4 h-12 w-12 text-sea-green" />
            <h2 className="mb-4 text-3xl font-bold">Validate Your Infrastructure Code</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Catch errors early and deploy with confidence using automated validation
            </p>
            <Button asChild size="lg" className="bg-sea-green hover:bg-sea-green/90">
              <Link href="/get-started">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
