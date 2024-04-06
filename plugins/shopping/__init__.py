"""
* shopping application
* 2024.04.06
"""
print(f'{__name__} loaded')

from flask import Blueprint, render_template, request, jsonify
import json
import os

blueprint_plugin = Blueprint("shopping", __name__, url_prefix="/shopping", template_folder="templates", static_folder="static")

os.environ["SHOPPING_LIST"] = "./data/shopping_list.json"

DATA = {"pending": [], "ready": []}

@blueprint_plugin.route('/')
def index():
    return render_template('shopping.html')


@blueprint_plugin.route('/api/<name>', methods=['DELETE'])
def delete(name):
    if name in DATA:
        DATA.remove(name)
        return jsonify(msg='Data deleted'), 200
    return jsonify(msg='Data not found'), 404


@blueprint_plugin.route('/api', methods=['GET','POST'])
def get_one():
    global DATA
    if request.method == 'GET':
        print(os.getcwd())
        try:
            with open(os.environ.get("SHOPPING_LIST"), "rt") as file:
                DATA = json.load(file)
        except:
            DATA = {"pending": [], "ready": []}
        return {"msg":"Get data Ok","data":DATA}, 200
    elif request.method == 'POST':
        data = request.get_json()
        DATA = data
        with open(os.environ.get("SHOPPING_LIST"),"wt") as file:
            json.dump(DATA, file, ensure_ascii=False);
        print('data: ', data)
        return {"msg":"Sikeres mentés."}, 200
    pass