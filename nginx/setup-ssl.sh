#!/bin/bash

# SSL Setup Script for TheCloudbox
# This script helps set up Let's Encrypt SSL certificates

set -e

echo "🔒 TheCloudbox SSL Setup"
echo "========================"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root" 
   exit 1
fi

# Configuration
DOMAIN="thecloudbox.com"
EMAIL="admin@thecloudbox.com"  # Change this to your email
WEBROOT="/var/www/certbot"

# Create webroot directory
mkdir -p $WEBROOT

# Install certbot if not present
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing certbot..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Obtain SSL certificate
echo "🔐 Obtaining SSL certificate for $DOMAIN and www.$DOMAIN..."
certbot certonly \
    --webroot \
    --webroot-path=$WEBROOT \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Copy nginx configuration
echo "📋 Setting up nginx configuration..."
cp /opt/cloudbox/nginx/thecloudbox.conf /etc/nginx/sites-available/

# Create symlink if it doesn't exist
if [ ! -L /etc/nginx/sites-enabled/thecloudbox.conf ]; then
    ln -s /etc/nginx/sites-available/thecloudbox.conf /etc/nginx/sites-enabled/
fi

# Test nginx configuration
echo "🔍 Testing nginx configuration..."
nginx -t

# Reload nginx
echo "🔄 Reloading nginx..."
systemctl reload nginx

# Set up auto-renewal
echo "⚙️  Setting up auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -

echo "✅ SSL setup complete!"
echo ""
echo "Your site should now be accessible at:"
echo "  https://$DOMAIN"
echo "  https://www.$DOMAIN"
echo ""
echo "SSL certificates will auto-renew via cron job."
