#!/bin/bash

export app_path=$(realpath $(dirname $0))
#echo "Script path: $app_path"

export FLASK_APP="$app_path/app.py"
export FLASK_DEBUG=True
$app_path/venv/bin/flask run --host=0.0.0.0 --port=8888
