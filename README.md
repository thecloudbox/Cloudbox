# TheCloudbox - Multi-Cloud Infrastructure Management Platform

<div align="center">

```
╔════════════════════════════════════════╗
║                                        ║
║         TheCloudbox                    ║
║         Delivering Solutions           ║
║                                        ║
╚════════════════════════════════════════╝
```

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/pawans-projects-ed75b291/v0-managed-kafka-clusters)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/kZibK8otjQj)

Professional DevOps and Managed Services Platform for Enterprise Infrastructure

</div>

## 🚀 Quick Start

The fastest way to get started with TheCloudbox:

```bash
chmod +x setup.sh
./setup.sh
```

That's it! The setup script will handle everything automatically.

## 📋 What's Included

### Core Services
- **Managed Kafka** - Enterprise-grade Kafka clusters across AWS, GCP, Azure, and Linode
- **Redis Clusters** - High-performance in-memory data stores
- **MySQL Databases** - Master-slave replication with orchestration
- **PostgreSQL** - Advanced relational database management
- **Elasticsearch** - Full-text search and analytics engine
- **MongoDB** - NoSQL database with sharding support
- **NAT Gateway** - iptables-based firewall and networking

### Professional Website
- Landing page with service categories
- Technical blog with SEO-optimized articles (2022-2024)
- Case studies and client success stories
- Pricing and service packages
- Industry-specific solutions
- Partner and technology showcase

### Infrastructure Tools
- **InfraPredict** - AI-powered capacity planning
- **ConfigDrift Scanner** - Multi-cloud configuration monitoring
- **ObservabilityHub** - Unified monitoring platform
- **AutoRemediate** - Self-healing infrastructure
- **CloudCostOptimizer** - Real-time cost optimization
- **IaC Generator** - Terraform template generation

### Logo Options
View 5 professional logo designs:
- `/1` - Terminal Window with Cloud Output (Recommended)
- `/2` - Command Transform Animation
- `/3` - Container Cube with Circuit Patterns
- `/4` - Circuit Cloud Design
- `/5` - Infrastructure Stack Layers

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│           Nginx Reverse Proxy               │
│         (Load Balancer + SSL/TLS)           │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│       Next.js Application (Port 3000)       │
│   - Multi-cloud service provisioning        │
│   - IaC generation (Terraform)              │
│   - Cost estimation engine                  │
│   - Professional marketing website          │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐  ┌──────▼──────┐
│ PostgreSQL  │  │    Redis    │
│  Database   │  │    Cache    │
│ (Port 5432) │  │ (Port 6379) │
└─────────────┘  └─────────────┘
```

## 📦 Services

| Service | Port | Description |
|---------|------|-------------|
| Web App | 3000 | Next.js application |
| PostgreSQL | 5432 | Primary database |
| Redis | 6379 | Caching layer |
| Nginx | 80/443 | Reverse proxy |

## 🛠️ Prerequisites

- **Docker** 20.10 or higher
- **Docker Compose** 2.0 or higher
- **4GB RAM** minimum
- **10GB disk space**

### Installation

**macOS:**
```bash
brew install docker docker-compose
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
```

**Windows:**
Download Docker Desktop from https://www.docker.com/products/docker-desktop

## 🚀 Deployment

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd thecloudbox

# Run setup script
chmod +x setup.sh
./setup.sh

# Access the application
open http://localhost:3000
```

### Production Deployment

#### AWS EC2
```bash
# Launch EC2 instance (t3.medium or larger recommended)
ssh ec2-user@<your-ec2-ip>

# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Deploy TheCloudbox
git clone <repository-url>
cd thecloudbox
./setup.sh
```

#### GCP Compute Engine
```bash
# Create VM instance
gcloud compute instances create thecloudbox \
  --machine-type=n1-standard-2 \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB

# SSH and deploy
gcloud compute ssh thecloudbox
git clone <repository-url>
cd thecloudbox
./setup.sh
```

#### Azure VM
```bash
# Create resource group and VM
az group create --name thecloudbox-rg --location eastus
az vm create \
  --resource-group thecloudbox-rg \
  --name thecloudbox-vm \
  --image UbuntuLTS \
  --size Standard_B2s \
  --admin-username azureuser

# SSH and deploy
az ssh vm --name thecloudbox-vm --resource-group thecloudbox-rg
git clone <repository-url>
cd thecloudbox
./setup.sh
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/thecloudbox
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=thecloudbox

# Redis
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=your_secure_redis_password

# Cloud Provider Credentials (Optional)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1

GCP_PROJECT_ID=your_gcp_project
GCP_CREDENTIALS=your_gcp_credentials_json

AZURE_SUBSCRIPTION_ID=your_azure_subscription
AZURE_CLIENT_ID=your_azure_client
AZURE_CLIENT_SECRET=your_azure_secret
AZURE_TENANT_ID=your_azure_tenant

LINODE_TOKEN=your_linode_token
```

## 📊 Management Commands

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f web
docker-compose logs -f postgres
docker-compose logs -f redis

# Check service status
docker-compose ps

# Restart services
docker-compose restart

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Scale web service
docker-compose up -d --scale web=3

# Database backup
docker-compose exec postgres pg_dump -U postgres thecloudbox > backup_$(date +%Y%m%d).sql

# Database restore
docker-compose exec -T postgres psql -U postgres thecloudbox < backup.sql

# Clean up (WARNING: Deletes all data)
docker-compose down -v
```

## 🔍 Monitoring

### Health Checks

```bash
# Check application health
curl http://localhost:3000

# Check PostgreSQL
docker-compose exec postgres pg_isready -U postgres

# Check Redis
docker-compose exec redis redis-cli ping

# View resource usage
docker stats
```

### Log Locations

- Application logs: `./logs/app.log`
- Nginx logs: Docker volume `nginx-logs`
- PostgreSQL logs: Docker volume `postgres-data`

## 🔒 Security

### Production Checklist

- [ ] Change all default passwords in `.env`
- [ ] Enable SSL/TLS with valid certificates
- [ ] Configure firewall rules (allow only ports 80, 443)
- [ ] Set up automated database backups
- [ ] Enable monitoring and alerting
- [ ] Review nginx security headers
- [ ] Implement rate limiting
- [ ] Regular security updates
- [ ] Enable Docker security scanning
- [ ] Use secrets management (AWS Secrets Manager, HashiCorp Vault)

### SSL/TLS Setup

```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsenvrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem

# Update nginx.conf (uncomment SSL section)
# Restart nginx
docker-compose restart nginx
```

## 🧪 Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [API Documentation](./docs/API.md) - API endpoints and usage
- [Architecture Guide](./docs/ARCHITECTURE.md) - System architecture
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

## 🤝 Support

### Client Experience

We have extensive experience working with:
- **Paytm** - Financial services infrastructure
- **Gojek** - Multi-service platform scaling
- **IRCTC** - High-traffic railway booking system
- **Mystifly** - Travel technology infrastructure
- **Part+** - E-commerce platform management

### Get Help

- 📧 Email: support@thecloudbox.io
- 💬 Slack: [Join our community](https://thecloudbox.slack.com)
- 🐛 Issues: [GitHub Issues](https://github.com/thecloudbox/thecloudbox/issues)
- 📖 Docs: [Documentation Site](https://docs.thecloudbox.io)

## 📄 License

Copyright © 2025 TheCloudbox. All rights reserved.

## 🙏 Acknowledgments

Built with:
- [Next.js 16](https://nextjs.org)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://radix-ui.com)
- [Docker](https://docker.com)
- [PostgreSQL](https://postgresql.org)
- [Redis](https://redis.io)

---

<div align="center">
Made with ❤️ by TheCloudbox Team

[Website](https://thecloudbox.io) • [Blog](https://thecloudbox.io/blog) • [Twitter](https://twitter.com/thecloudbox) • [LinkedIn](https://linkedin.com/company/thecloudbox)
</div>
