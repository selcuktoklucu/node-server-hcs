#!/bin/bash

API="http://localhost:3000"
URL_PATH="/users"
UNAME='st@st.com'
PASSWORD='stst'
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "username": "'"${UNAME}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
