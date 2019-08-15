#!/bin/bash

API="http://localhost:3000"
URL_PATH="/tasks"
ID=5d5371df6eb0ac6ce01519bf
TOKEN=13a75cbc9bf3969d19d7947c45318ebb

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
