# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Base box
  config.vm.box = "ubuntu/jammy64"
  config.vm.box_version = "~> 20230607.0.0"

  # VM Configuration
  config.vm.hostname = "cloudsentinel-vm"
  
  # Network Configuration
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 9090, host: 9090, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 3001, host: 3001, host_ip: "127.0.0.1"
  config.vm.network "private_network", ip: "192.168.56.10"

  # Provider Configuration
  config.vm.provider "virtualbox" do |vb|
    vb.name = "cloudsentinel"
    vb.memory = "4096"
    vb.cpus = 2
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  # Synced Folder
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"

  # Provisioning Script
  config.vm.provision "shell", inline: <<-SHELL
    # Update system
    apt-get update
    apt-get upgrade -y

    # Install Docker
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io

    # Install Docker Compose
    curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose

    # Add vagrant user to docker group
    usermod -aG docker vagrant

    # Install kubectl (optional for k8s testing)
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

    # Install k3s (lightweight Kubernetes)
    curl -sfL https://get.k3s.io | sh -

    # Install Node.js and npm
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs

    # Install useful tools
    apt-get install -y vim git htop net-tools

    echo "=========================================="
    echo "CloudSentinel VM Setup Complete!"
    echo "=========================================="
    echo "Access the application at: http://localhost:3000"
    echo "Prometheus: http://localhost:9090"
    echo "Grafana: http://localhost:3001"
    echo ""
    echo "To start CloudSentinel:"
    echo "  vagrant ssh"
    echo "  cd /vagrant"
    echo "  ./setup.sh"
    echo "=========================================="
  SHELL
end
