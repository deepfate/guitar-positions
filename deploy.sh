#!/bin/bash

# NOTE: This script is strictly reserved for the Vultr server.
# This script does two things.
# 1. Crushes code into static files...
# 2. Physically moves those files into Nginx's system folders (var/www/...)
# ---
# Running this script on anything but the Vultr server will crash.
#
# NOTE: If you want to develop live and see changes instantly, just pull onto local machine and just use built-in NPM commands:
#       npm run dev
#
#
#

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
