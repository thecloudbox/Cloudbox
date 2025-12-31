# TheCloudbox Deployment Guide

## Quick Start with setup.sh

The easiest way to get started:

```bash
chmod +x setup.sh
./setup.sh
```

This script will:
- Check prerequisites (Docker, Docker Compose)
- Create `.env` file if needed
- Build and start all services
- Initialize the database
- Verify service health

## Manual Setup

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- 4GB RAM minimum
- 10GB disk space

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thecloudbox
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start services**
   ```bash
   docker-compose up -d
   ```

4. **Check status**
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

## Service Architecture

- **Web (Port 3000)**: Next.js application
- **PostgreSQL (Port 5432)**: Primary database
- **Redis (Port 6379)**: Caching and sessions
- **Nginx (Port 80/443)**: Reverse proxy and load balancer

## Production Deployment

### AWS EC2

```bash
# Launch EC2 instance (t3.medium or larger)
# Install Docker
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Deploy
git clone <repository-url>
cd thecloudbox
./setup.sh
```

### GCP Compute Engine

```bash
# Create VM instance
gcloud compute instances create thecloudbox \
  --machine-type=n1-standard-2 \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud

# SSH and deploy
gcloud compute ssh thecloudbox
# Follow AWS EC2 steps above
```

### Azure VM

```bash
# Create VM
az vm create \
  --resource-group thecloudbox-rg \
  --name thecloudbox-vm \
  --image UbuntuLTS \
  --size Standard_B2s

# SSH and deploy
az ssh vm --name thecloudbox-vm
# Follow AWS EC2 steps above
```

## Maintenance Commands

```bash
# View logs
docker-compose logs -f web
docker-compose logs -f postgres
docker-compose logs -f redis

# Restart services
docker-compose restart

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Database backup
docker-compose exec postgres pg_dump -U postgres thecloudbox > backup.sql

# Database restore
docker-compose exec -T postgres psql -U postgres thecloudbox < backup.sql

# Clean up everything
docker-compose down -v
```

## Monitoring

- Application logs: `docker-compose logs -f web`
- Database health: `docker-compose exec postgres pg_isready`
- Redis health: `docker-compose exec redis redis-cli ping`
- System resources: `docker stats`

## Troubleshooting

### Port already in use
```bash
# Check what's using the port
sudo lsof -i :3000
# Kill the process or change port in docker-compose.yml
```

### Database connection issues
```bash
# Check PostgreSQL logs
docker-compose logs postgres
# Verify DATABASE_URL in .env
```

### Out of memory
```bash
# Increase Docker memory limit in Docker Desktop
# Or use smaller container images
```

## SSL/TLS Configuration

1. Obtain SSL certificates (Let's Encrypt recommended)
2. Place certificates in `./ssl/` directory
3. Uncomment SSL configuration in `nginx.conf`
4. Restart nginx: `docker-compose restart nginx`

## Scaling

To scale the web service:

```bash
docker-compose up -d --scale web=3
```

## Security Checklist

- [ ] Change default passwords in `.env`
- [ ] Enable SSL/TLS
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Enable monitoring and alerts
- [ ] Review and update nginx security headers
- [ ] Implement rate limiting
- [ ] Regular security updates

## Support

For issues or questions:
- Email: support@thecloudbox.io
- GitHub Issues: <repository-url>/issues
