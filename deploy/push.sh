#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-update docs}"

echo "==> Building..."
npm run build

echo "==> Staging all changes..."
git add -A

echo "==> Committing..."
git commit -m "$MESSAGE"

echo "==> Pushing to GitHub..."
git push origin main

echo ""
echo "Done! https://github.com/Novaspand/alp-ui"
echo "VPS update: ssh VPS && cd /var/www/alp-ui && sudo git pull && sudo systemctl reload nginx"
