#!/bin/sh

# Create runtime env configuration from environment variables
echo "window.__ENV = {};" > /usr/share/nginx/html/env-config.js
# Add all VITE_ environment variables to runtime config
env | grep -E '^VITE_' | while read -r line; do
  key=$(echo $line | cut -d= -f1)
  value=$(echo $line | cut -d= -f2-)
  echo "window.__ENV[\"$key\"] = \"$value\";" >> /usr/share/nginx/html/env-config.js
done

# Start nginx
exec nginx -g 'daemon off;'
