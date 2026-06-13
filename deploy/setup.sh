#!/usr/bin/env bash
set -euo pipefail

# Run this ONCE on your VPS after the initial git clone
# Usage: cd /var/www/alp-ui && bash deploy/setup.sh

DOMAIN="${1:-ui.novaspand.com}"
EMAIL="${2:-admin@novaspand.com}"

echo "==> Installing nginx + certbot..."
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx

echo "==> Copying nginx config..."
sudo cp deploy/nginx.conf /etc/nginx/sites-available/$DOMAIN
sudo sed -i "s/ui\.novaspand\.com/$DOMAIN/g" /etc/nginx/sites-available/$DOMAIN
sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

echo "==> Testing nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "==> SSL with Let's Encrypt..."
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" || true

echo ""
echo "Done! Site should be live at https://$DOMAIN"
echo ""
echo "To update the site later:"
echo "  # Build locally, then push to GitHub:"
echo "  npm run build && git add -A && git commit -m 'update' && git push"
echo "  # On VPS:"
echo "  cd /var/www/alp-ui && git pull && sudo systemctl reload nginx"
