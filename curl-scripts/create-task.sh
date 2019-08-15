#!/bin/bash

API="http://localhost:3000"
URL_PATH="/tasks"
TEXT='TextCurlScriptSELCUK222'
TOKEN=549572b85bbb441d1ddde5a904f1f05d
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "task": {
      "description": "'"${TEXT}"'"
    }
  }'

echo
