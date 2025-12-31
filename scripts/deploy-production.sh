#!/bin/bash

# Production Deployment Script for CloudSentinel

set -e

ENVIRONMENT=${1:-production}
VERSION=${2:-latest}

echo "Deploying CloudSentinel to ${ENVIRONMENT}..."

if [ "$ENVIRONMENT" == "aws" ]; then
    echo "Deploying to AWS EKS..."
    kubectl config use-context aws-eks-cloudsentinel
    kubectl set image deployment/cloudsentinel-app \
      cloudsentinel=thecloudbox/cloudsentinel:${VERSION} \
      -n cloudsentinel
      
elif [ "$ENVIRONMENT" == "gcp" ]; then
    echo "Deploying to GCP GKE..."
    kubectl config use-context gke-cloudsentinel
    kubectl set image deployment/cloudsentinel-app \
      cloudsentinel=thecloudbox/cloudsentinel:${VERSION} \
      -n cloudsentinel
      
elif [ "$ENVIRONMENT" == "azure" ]; then
    echo "Deploying to Azure AKS..."
    kubectl config use-context aks-cloudsentinel
    kubectl set image deployment/cloudsentinel-app \
      cloudsentinel=thecloudbox/cloudsentinel:${VERSION} \
      -n cloudsentinel
      
else
    echo "Deploying with Docker Compose..."
    docker-compose -f docker-compose.prod.yml pull
    docker-compose -f docker-compose.prod.yml up -d
fi

echo "Deployment complete! Version: ${VERSION}"
