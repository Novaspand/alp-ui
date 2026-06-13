#!/usr/bin/env bash
# Manual steps reference — run each command yourself, don't execute this file directly.
# See DEPLOY.md for the step-by-step guide.
set -euo pipefail

DOMAIN="alp-ui.novaspand.com"
EMAIL="admin@novaspand.com"
REPO="git@github.com:novaspand/alp-ui.git"
DIR="/var/www/alp-ui"

echo "1. ssh into VPS"
echo "2. sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx"
echo "3. sudo mkdir -p /var/www"
echo "4. sudo git clone $REPO $DIR"
echo "5. sudo cp $DIR/deploy/nginx.conf /etc/nginx/sites-available/$DOMAIN"
echo "6. sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
echo "7. sudo rm -f /etc/nginx/sites-enabled/default"
echo "8. sudo nginx -t && sudo systemctl reload nginx"
echo "9. sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m $EMAIL"
echo ""
echo "To update later: cd $DIR && sudo git pull && sudo systemctl reload nginx"
