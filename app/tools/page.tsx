import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Search, Eye, Zap, DollarSign, Shield, GitBranch, Activity } from "lucide-react"
import Link from "next/link"

export default function ToolsPage() {
  const tools = [
    {
      name: "CloudSentinel",
      tagline: "Open-Source AIOps Platform",
      description:
        "Revolutionary ML-powered monitoring with natural language queries, cost intelligence, blast radius prediction, and auto-remediation. Features that don't exist in commercial platforms",
      icon: Activity,
      features: [
        "Ask questions in plain English",
        "Cross-cloud cost correlation",
        "Blast radius prediction before deploy",
        "Auto-generated runbooks from incidents",
      ],
      status: "Available",
      category: "AIOps",
      featured: true,
    },
    {
      name: "InfraPredict",
      tagline: "AI-Powered Capacity Planning",
      description:
        "Machine learning-driven infrastructure forecasting that predicts capacity needs, performance bottlenecks, and scaling requirements 3-6 months in advance",
      icon: Brain,
      features: [
        "Predictive autoscaling recommendations",
        "Anomaly detection and alert forecasting",
        "Cost projection with 95% accuracy",
        "What-if scenario modeling",
      ],
      status: "Available",
      category: "AIOps",
    },
    {
      name: "ConfigDrift Scanner",
      tagline: "Multi-Cloud Configuration Integrity",
      description:
        "Real-time detection of configuration drift across AWS, GCP, Azure, and Linode. Automatically identifies deviations from approved baselines and security policies",
      icon: Search,
      features: [
        "Continuous drift monitoring across all clouds",
        "Policy-as-code enforcement",
        "Automated remediation workflows",
        "Compliance reporting (SOC2, HIPAA, PCI-DSS)",
      ],
      status: "Available",
      category: "Security & Compliance",
    },
    {
      name: "ObservabilityHub",
      tagline: "Unified Multi-Service Monitoring",
      description:
        "Single pane of glass for all your managed services. Monitor Kafka, Redis, MongoDB, Elasticsearch, PostgreSQL, and MySQL from one centralized dashboard",
      icon: Eye,
      features: [
        "Unified metrics across all databases",
        "Cross-service correlation analysis",
        "Intelligent alert aggregation",
        "Custom SLO tracking and reporting",
      ],
      status: "Available",
      category: "Monitoring",
    },
    {
      name: "AutoRemediate",
      tagline: "Self-Healing Infrastructure Platform",
      description:
        "Automated incident response system that detects, diagnoses, and resolves common infrastructure issues without human intervention. Learns from past incidents to improve over time",
      icon: Zap,
      features: [
        "Automated runbook execution",
        "Context-aware decision making",
        "Progressive learning from incidents",
        "Safe rollback mechanisms",
      ],
      status: "Beta",
      category: "AIOps",
    },
    {
      name: "CloudCostOptimizer",
      tagline: "Real-Time Cost Intelligence",
      description:
        "AI-driven cost optimization engine that continuously analyzes your cloud spending and automatically implements approved cost-saving recommendations",
      icon: DollarSign,
      features: [
        "Real-time cost anomaly detection",
        "Automated reserved instance optimization",
        "Rightsizing recommendations with impact analysis",
        "Multi-cloud cost comparison",
      ],
      status: "Available",
      category: "FinOps",
    },
    {
      name: "SecureScale",
      tagline: "Security-First Auto-Scaling",
      description:
        "Intelligent scaling engine that considers security posture, compliance requirements, and performance metrics when making scaling decisions",
      icon: Shield,
      features: [
        "Security-aware scaling policies",
        "Compliance-preserving instance selection",
        "Threat-informed capacity management",
        "Zero-trust network scaling",
      ],
      status: "Coming Soon",
      category: "Security & Compliance",
    },
    {
      name: "IaCValidator",
      tagline: "Terraform & CloudFormation Testing",
      description:
        "Comprehensive infrastructure-as-code validation that catches errors before deployment. Tests for security, cost, performance, and compliance issues",
      icon: GitBranch,
      features: [
        "Pre-deployment validation and testing",
        "Cost impact analysis before apply",
        "Security vulnerability scanning",
        "Policy compliance checking",
      ],
      status: "Available",
      category: "DevOps",
    },
    {
      name: "ChaosPilot",
      tagline: "Intelligent Chaos Engineering",
      description:
        "AI-guided chaos experiments that safely test your infrastructure resilience. Automatically designs and executes experiments based on your architecture",
      icon: Activity,
      features: [
        "Automated blast radius calculation",
        "Safe experiment design and execution",
        "Resilience scoring and reporting",
        "Continuous validation testing",
      ],
      status: "Beta",
      category: "Reliability",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0e14]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-[#1a1d29] via-[#0d0e14] to-[#0d0e14]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
          <div className="relative container mx-auto px-6">
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                $ innovative-tools --production-ready
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">DevOps & AIOps Tools</h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                Purpose-built tools solving real infrastructure challenges. Born from managing thousands of production
                environments, now available to accelerate your operations.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                const toolSlug = tool.name.toLowerCase().replace(/\s+/g, "")
                const toolPath = tool.name === "CloudSentinel" ? "/cloudsentinel" : `/tools/${toolSlug}`

                return (
                  <Card
                    key={index}
                    className="bg-[#1a1d29] border-slate-800 hover:border-emerald-500/30 transition-all"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{tool.category}</Badge>
                          <Badge
                            variant={
                              tool.status === "Available" ? "default" : tool.status === "Beta" ? "secondary" : "outline"
                            }
                          >
                            {tool.status}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{tool.name}</CardTitle>
                      <CardDescription className="text-base font-medium text-foreground/80 mb-3">
                        {tool.tagline}
                      </CardDescription>
                      <p className="text-muted-foreground">{tool.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-sm">Key Features</h4>
                        <ul className="space-y-2">
                          {tool.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        variant={tool.status === "Available" ? "default" : "outline"}
                        size="sm"
                        className={
                          tool.status === "Available"
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "border-slate-700 text-slate-300"
                        }
                        disabled={tool.status === "Coming Soon"}
                        asChild={tool.status !== "Coming Soon"}
                      >
                        {tool.status === "Coming Soon" ? (
                          <span>Coming Soon</span>
                        ) : (
                          <Link href={toolPath}>{tool.status === "Beta" ? "Beta Access" : "Learn More"}</Link>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Open Source */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Open Source Commitment</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Many of our tools are available as open source. We believe in giving back to the community that has
                given us so much. Check out our GitHub for libraries, utilities, and automation scripts used in
                production by hundreds of companies.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <a href="https://github.com/thecloudbox" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/contact">Request Enterprise Access</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
