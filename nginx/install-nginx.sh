#!/bin/bash

# Nginx Installation and Setup Script for TheCloudbox

set -e

echo "🚀 TheCloudbox Nginx Setup"
echo "=========================="

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root" 
   exit 1
fi

# Install nginx
echo "📦 Installing nginx..."
apt-get update
apt-get install -y nginx

# Create log directory
mkdir -p /var/log/nginx

# Backup default nginx config
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "📁 Backing up default nginx config..."
    mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.backup
fi

# Copy TheCloudbox nginx config
echo "📋 Installing TheCloudbox nginx configuration..."
cp /opt/cloudbox/nginx/thecloudbox.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/thecloudbox.conf /etc/nginx/sites-enabled/

# Test nginx configuration
echo "🔍 Testing nginx configuration..."
nginx -t

# Start and enable nginx
echo "🔄 Starting nginx..."
systemctl enable nginx
systemctl restart nginx

echo "✅ Nginx installation complete!"
echo ""
echo "Next steps:"
echo "1. Update your domain DNS to point to this server"
echo "2. Run './nginx/setup-ssl.sh' to set up SSL certificates"
echo "3. Make sure your Next.js app is running on port 3000"
