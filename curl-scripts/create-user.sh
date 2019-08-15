#!/bin/bash

API="http://localhost:3000"
URL_PATH="/users/sign-up"
UNAME="newSelcuk222"
PASSWORD="123"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "username": "'"${UNAME}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
