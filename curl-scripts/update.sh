#!/bin/bash

API="http://localhost:3000"
URL_PATH="/tasks"
D='Newdescription'
DUE=2019-01-01
TOKEN=ba79fc6961988f4f5ac3cb72e618c2c4
ID=5d53882cb7cf690f67119ac6
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PUT \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "task": {
      "description": "'"${D}"'",
      "dueDate": "'"${DUE}"'"
    }
  }'

echo
