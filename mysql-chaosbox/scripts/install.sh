#!/bin/bash
set -e

echo "Installing MySQL ChaosBox..."

# Detect OS
OS=$(uname -s)
ARCH=$(uname -m)

# Download latest release
VERSION="v1.0.0"
BINARY="chaosbox-${OS,,}-${ARCH}"

curl -L "https://github.com/thecloudbox/mysql-chaosbox/releases/download/${VERSION}/${BINARY}" \
  -o /tmp/chaosbox

# Install
sudo mv /tmp/chaosbox /usr/local/bin/chaosbox
sudo chmod +x /usr/local/bin/chaosbox

echo "✓ MySQL ChaosBox installed successfully!"
echo ""
echo "Quick start:"
echo "  chaosbox init"
echo "  chaosbox run --scenario mysql-crash"
echo ""
echo "Documentation: https://thecloudbox.io/tools/mysql-chaosbox"
