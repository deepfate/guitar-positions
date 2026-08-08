#!/bin/bash

# The line below tells Linux to instantly abort the script if any command below fails.
# Prevents copying a broken build to the live site.
set -e

# Define where your Nginx web folders live (change these if your paths are different)
PROD_DIR="/var/www/Guitar-Position-Trainer"
DEV_DIR="/var/www/dev.deepfates.xyz"

if [ "$1" == "prod" ]; then
    echo "🚀 Building for Production..."
    export DEPLOY_ENV=prod
    npx vite build --base=/Guitar-Position-Trainer/

    echo "📂 Copying files to $PROD_DIR..."
    mkdir -p $PROD_DIR
    rm -rf $PROD_DIR/*
    cp -r dist/* $PROD_DIR/
    
    echo "✅ Done! Live at deepfates.xyz/Guitar-Position-Trainer"

elif [ "$1" == "dev" ]; then
    echo "🛠️  Building for Development..."
    export DEPLOY_ENV=dev
    npx vite build --base=/

    echo "📂 Copying files to $DEV_DIR..."
    mkdir -p $DEV_DIR
    rm -rf $DEV_DIR/*
    cp -r dist/* $DEV_DIR/

    echo "✅ Done! Live at dev.deepfates.xyz"

else
    echo "⚠️  Usage: ./deploy.sh [prod|dev]"
fi
