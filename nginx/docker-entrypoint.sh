#!/bin/sh
set -eu

API_UPSTREAM="${API_UPSTREAM:-https://rsd-ai.ru}"
API_HOST="${API_HOST:-}"

if [ -z "$API_HOST" ]; then
  API_HOST=$(printf '%s' "$API_UPSTREAM" | sed -E 's#^https?://##; s#/.*##')
fi

sed \
  -e "s|__API_UPSTREAM__|${API_UPSTREAM}|g" \
  -e "s|__API_HOST__|${API_HOST}|g" \
  /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
