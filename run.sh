#!/bin/bash

export APP_PATH=$(realpath $(dirname $0))
export SHOPPING_JSON="$APP_PATH/data/shopping_list.json"
export FLASK_APP="$APP_PATH/app.py"
#echo "Script path: $app_path"
if  [ $USER == pi ]
then
    export FLASK_DEBUG=False
    $APP_PATH/venv/bin/flask run --host=0.0.0.0 --port=80
else
    export FLASK_DEBUG=True
    $APP_PATH/venv/bin/flask run --host=0.0.0.0 --port=8080
fi