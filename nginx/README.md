# Nginx Configuration for TheCloudbox

Production-ready nginx configuration with SSL, security headers, and optimized caching.

## Prerequisites

- Ubuntu/Debian server
- Root or sudo access
- Domain pointing to your server
- Next.js app running on port 3000

## Quick Setup

### 1. Install Nginx

```bash
sudo ./nginx/install-nginx.sh
```

### 2. Update Configuration

Edit `nginx/thecloudbox.conf` and `nginx/setup-ssl.sh`:
- Change `thecloudbox.com` to your domain
- Update `admin@thecloudbox.com` to your email

### 3. Set Up SSL

```bash
sudo ./nginx/setup-ssl.sh
```

### 4. Start Next.js App

```bash
cd /opt/cloudbox
npm run build
npm start
```

## Manual Setup

### Install Nginx

```bash
sudo apt-get update
sudo apt-get install -y nginx
```

### Copy Configuration

```bash
sudo cp nginx/thecloudbox.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/thecloudbox.conf /etc/nginx/sites-enabled/
```

### Get SSL Certificate

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d thecloudbox.com -d www.thecloudbox.com
```

### Test and Reload

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Configuration Features

✅ **HTTP to HTTPS Redirect**
✅ **HTTP/2 Support**
✅ **Modern SSL/TLS Configuration**
✅ **Security Headers** (HSTS, CSP, X-Frame-Options, etc.)
✅ **Gzip Compression**
✅ **Static File Caching**
✅ **Proxy to Next.js on Port 3000**
✅ **OCSP Stapling**
✅ **Auto SSL Renewal**

## Troubleshooting

### Check Nginx Status
```bash
sudo systemctl status nginx
```

### View Logs
```bash
sudo tail -f /var/log/nginx/thecloudbox-error.log
sudo tail -f /var/log/nginx/thecloudbox-access.log
```

### Test Configuration
```bash
sudo nginx -t
```

### Reload After Changes
```bash
sudo systemctl reload nginx
```

### Check SSL Certificate
```bash
sudo certbot certificates
```

### Renew SSL Certificate Manually
```bash
sudo certbot renew
```

## Performance Tuning

The configuration includes:
- Static file caching (365 days for immutable assets)
- Gzip compression for text files
- Keep-alive connections
- HTTP/2 support
- Proxy buffering optimization

## Security

Implements modern security best practices:
- TLS 1.2 and 1.3 only
- Strong cipher suites
- HSTS with preload
- CSP headers
- X-Frame-Options
- X-Content-Type-Options
- Rate limiting ready (uncomment in config)

## Port Configuration

- Port 80: HTTP (redirects to HTTPS)
- Port 443: HTTPS (main application)
- Port 3000: Next.js backend (internal)

Make sure your firewall allows ports 80 and 443:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
