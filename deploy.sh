#!/bin/bash

# Deploy script for GitHub Pages
# Usage: ./deploy.sh "Your commit message"

set -e

echo "🚀 Starting deployment..."

# Make sure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Not on main branch. Switching to main..."
    git checkout main
fi

# Build the project
echo "📦 Building project..."
cd client
npm run build
cd ..

# Store build path
BUILD_DIR="client/build"

# Switch to gh-pages branch
echo "🔄 Switching to gh-pages branch..."
git checkout gh-pages

# Clean up any existing files except .git and deploy.sh
echo "🧹 Cleaning up old files..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name 'deploy.sh' -exec rm -rf {} +

# Copy build files (only from build directory)
echo "📋 Copying build files..."
if [ -d "$BUILD_DIR" ]; then
    cp -r "$BUILD_DIR"/* .
    echo "www.perryservant.com" > CNAME
else
    echo "❌ Error: Build directory not found! Make sure you're on main branch and have built the project."
    git checkout main
    exit 1
fi

# Double-check: Remove any accidentally copied node_modules or cache directories
echo "🧹 Removing any cache files..."
rm -rf node_modules .cache client

# Commit and push
echo "💾 Committing changes..."
git add .
git commit -m "${1:-Deploy latest changes}" || echo "No changes to commit"
git push origin gh-pages

# Switch back to main
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your site should update in a few minutes at www.perryservant.com"
