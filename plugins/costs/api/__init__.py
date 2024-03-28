"""
costs/api
2024.03.22
"""

print(f'{__name__} loaded')

from flask import Blueprint, request, jsonify
from db import get_db
from pprint import pprint


api = Blueprint("api", __name__, url_prefix="/api")

@api.route("/", methods=["GET", "POST"])
def api_index():
    if request.method == "GET":
        db = get_db()
        cur= db.cursor()
        print(dict(request.args)) # query string to dict
        cur.execute('SELECT count(id) AS records FROM costs;')
        record_count = dict(cur.fetchone())
        cur.execute('SELECT * FROM costs;')
        print('Download list:')
        rows = cur.fetchall()
        return jsonify({
            "data": [list(row) for row in rows],
            "msg": "ok",
            "sumrecords": record_count.get("records")
            })
    elif request.method == "POST":
        pprint(request.get_json(), indent=4)
        #cur.execute("INSERT INTO costs")
        return jsonify({"msg": "ok"})
    

@api.route("/<id>") # egy elem kérése
def get_one(id):
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM costs WHERE id = ?;", id)
    record = cur.fetchone()
    if not record:
        return jsonify({"msg": f"No valid id: '{id}'"})
    else:
        return jsonify({
            "data": dict(record),
            "msg": "ok",
        })

    