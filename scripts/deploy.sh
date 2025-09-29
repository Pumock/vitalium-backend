#!/bin/bash

# Deployment Script for Vitalium Backend
# Usage: ./scripts/deploy.sh [environment]

set -e

# Default environment
ENVIRONMENT=${1:-staging}

echo "🚀 Starting deployment for environment: $ENVIRONMENT"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed"
    exit 1
fi

if ! command_exists docker; then
    echo "❌ Docker is not installed"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Set environment variables
case $ENVIRONMENT in
    "development")
        ENV_FILE=".env.development"
        ;;
    "staging")
        ENV_FILE=".env.staging"
        ;;
    "production")
        ENV_FILE=".env.production"
        ;;
    *)
        echo "❌ Invalid environment: $ENVIRONMENT"
        echo "Valid environments: development, staging, production"
        exit 1
        ;;
esac

echo "📁 Using environment file: $ENV_FILE"

# Check if environment file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Environment file $ENV_FILE not found"
    exit 1
fi

# Copy environment file
cp "$ENV_FILE" .env
echo "✅ Environment file copied"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🔨 Building application..."
npm run build

# Run tests if not production
if [ "$ENVIRONMENT" != "production" ]; then
    echo "🧪 Running tests..."
    npm run test
    npm run test:e2e
fi

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t vitalium-backend:$ENVIRONMENT .

# Tag for registry (optional)
if [ ! -z "$DOCKER_REGISTRY" ]; then
    echo "🏷️ Tagging image for registry..."
    docker tag vitalium-backend:$ENVIRONMENT $DOCKER_REGISTRY/vitalium-backend:$ENVIRONMENT
    
    echo "📤 Pushing to registry..."
    docker push $DOCKER_REGISTRY/vitalium-backend:$ENVIRONMENT
fi

# Deploy based on environment
case $ENVIRONMENT in
    "development")
        echo "🔧 Starting development server..."
        npm run start:dev
        ;;
    "staging"|"production")
        echo "🚀 Deploying to $ENVIRONMENT..."
        
        # Stop existing container if running
        docker stop vitalium-backend-$ENVIRONMENT 2>/dev/null || true
        docker rm vitalium-backend-$ENVIRONMENT 2>/dev/null || true
        
        # Run new container
        docker run -d \
            --name vitalium-backend-$ENVIRONMENT \
            --env-file .env \
            -p 3000:3000 \
            --restart unless-stopped \
            vitalium-backend:$ENVIRONMENT
        
        # Wait for container to be ready
        echo "⏳ Waiting for container to be ready..."
        sleep 10
        
        # Health check
        echo "🔍 Performing health check..."
        if curl -f http://localhost:3000/health > /dev/null 2>&1; then
            echo "✅ Health check passed"
        else
             echo "❌ Health check failed"
            exit 1
        fi
        ;;
esac

echo "🎉 Deployment completed successfully for environment: $ENVIRONMENT"

# Clean up
rm -f .env
echo "🧹 Cleanup completed"