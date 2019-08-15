#!/bin/sh

API="http://localhost:3000"
URL_PATH="/tasks"
TOKEN=520f358e18f332d9a809d4baad5edfde

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
