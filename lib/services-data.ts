import { Server, Database, Cloud, Wrench, Shield, Activity, Network, Code, Workflow } from "lucide-react"

export interface Service {
  id: string
  title: string
  description: string
  icon: any
  features: string[]
  slug: string
}

export const services: Service[] = [
  {
    id: "devops",
    title: "DevOps Engineering",
    description:
      "Transform your software delivery with modern DevOps practices, automation, and continuous integration/deployment pipelines.",
    icon: Workflow,
    features: [
      "CI/CD pipeline design and implementation",
      "Infrastructure automation with GitOps",
      "Container orchestration (Kubernetes, Docker)",
      "Release management and deployment strategies",
      "Build and deployment optimization",
    ],
    slug: "devops-engineering",
  },
  {
    id: "managed-services",
    title: "Managed Services",
    description:
      "24/7 monitoring, maintenance, and optimization of your critical infrastructure by experienced engineers.",
    icon: Shield,
    features: [
      "Round-the-clock infrastructure monitoring",
      "Proactive issue detection and resolution",
      "Performance tuning and optimization",
      "Security patching and updates",
      "Incident response and escalation",
    ],
    slug: "managed-services",
  },
  {
    id: "datacenter-migration",
    title: "Data Center Migration",
    description:
      "Seamlessly migrate workloads from legacy data centers to modern cloud or hybrid environments with zero downtime.",
    icon: Server,
    features: [
      "Migration strategy and planning",
      "Application dependency mapping",
      "Zero-downtime migration execution",
      "Network architecture redesign",
      "Post-migration validation and optimization",
    ],
    slug: "datacenter-migration",
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration",
    description: "Accelerate your cloud journey with expert migration services across AWS, GCP, and Azure platforms.",
    icon: Cloud,
    features: [
      "Cloud readiness assessment",
      "Multi-cloud migration strategies",
      "Application modernization",
      "Cloud-native architecture design",
      "Training and knowledge transfer",
    ],
    slug: "cloud-migration",
  },
  {
    id: "cost-optimization",
    title: "Cost Optimization",
    description:
      "Reduce cloud spend by 30-50% through rightsizing, commitment management, and architectural improvements.",
    icon: Activity,
    features: [
      "Cloud cost analysis and auditing",
      "Resource rightsizing recommendations",
      "Reserved instance and savings plan strategy",
      "Waste elimination and zombie resource cleanup",
      "FinOps practice implementation",
    ],
    slug: "cost-optimization",
  },
  {
    id: "noc-services",
    title: "NOC as a Service",
    description:
      "Professional Network Operations Center providing 24/7 monitoring, incident management, and escalation services.",
    icon: Network,
    features: [
      "24/7/365 monitoring and alerting",
      "Incident triage and response",
      "Escalation management",
      "Runbook execution and documentation",
      "Shift handoff and communication protocols",
    ],
    slug: "noc-services",
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    description:
      "Build scalable, repeatable infrastructure with Terraform, Pulumi, and CloudFormation following industry best practices.",
    icon: Code,
    features: [
      "IaC architecture and module design",
      "Terraform/Pulumi implementation",
      "State management and workflow automation",
      "Policy as code with OPA/Sentinel",
      "Multi-environment and multi-cloud support",
    ],
    slug: "infrastructure-as-code",
  },
  {
    id: "managed-databases",
    title: "Managed Databases",
    description: "Expert management of Kafka, MongoDB, Elasticsearch, MySQL, PostgreSQL, and Redis clusters at scale.",
    icon: Database,
    features: [
      "Database architecture and sizing",
      "Performance tuning and optimization",
      "High availability and disaster recovery",
      "Backup and restore procedures",
      "Upgrade and migration support",
    ],
    slug: "managed-databases",
  },
  {
    id: "aiops",
    title: "AIOps Implementation",
    description:
      "Implement AI-powered operations to reduce MTTR, predict incidents, and automate remediation workflows.",
    icon: Wrench,
    features: [
      "ML-based anomaly detection",
      "Predictive incident management",
      "Automated remediation workflows",
      "Intelligent alerting and noise reduction",
      "Capacity planning and forecasting",
    ],
    slug: "aiops-implementation",
  },
]
