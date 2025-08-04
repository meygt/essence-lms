#!/bin/bash
set -e

echo "Starting LMS deployment..."

# Load environment variables
export $(cat .env.production | xargs)

# Pull latest images
echo "Pulling latest Docker images..."
docker-compose -f docker-compose.production.yml pull

# Stop existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.production.yml down

# Start services
echo "Starting services..."
docker-compose -f docker-compose.production.yml up -d

# Wait for services to be healthy
echo "Waiting for services to be ready..."
sleep 30

# Check service status
echo "Checking service status..."
docker-compose -f docker-compose.production.yml ps

echo "Deployment completed successfully!"
echo "Access URLs:"
echo "- Client: https://learn.essenceqa.org"
echo "- Admin: https://learn.essenceqa.org/lms"
echo "- API: https://learn.essenceqa.org/api"