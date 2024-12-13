#!/bin/bash
export APP_PATH=$(realpath $(dirname $0))
export SHOPPING_LIST="$APP_PATH/data/shopping_list.json"
export FLASK_APP="$APP_PATH/app.py"
export FLASK_VENV="/home/gabo13/Tools/venv/bin/flask"
echo "Script path: $APP_PATH"
if  [ $USER == gabo13 ]
then
    export FLASK_DEBUG=False
    sudo setcap 'cap_net_bind_service=+ep' "$(readlink -f $(which python))"
    $FLASK_VENV run --host=0.0.0.0 --port=80
else
    export FLASK_DEBUG=True
    $FLASK_VENV --host=0.0.0.0 --port=8080
fi

