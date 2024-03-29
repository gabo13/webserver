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
    db = get_db()
    cur= db.cursor()
    if request.method == "GET":
        
        print(dict(request.args)) # query string to dict
        cur.execute('SELECT count(id) AS records FROM costs;')
        record_count = dict(cur.fetchone())
        cur.execute('SELECT * FROM costs;')
        print('Download list:')
        rows = cur.fetchall()
        return jsonify({
            "data": [list(row) for row in rows],
            "header": list(dict(rows[0]).keys()),
            "msg": "ok",
            "sumrecords": record_count.get("records")
            })
    elif request.method == "POST":
        data = request.get_json()
        
        cur.execute(f"""INSERT INTO costs
         (year, month, day, shop, spend, comment)
         VALUES (?,?,?,?,?,?);""",
         (
            data.get("year"),
            data.get("month"),
            data.get("day"),
            data.get("shop"),
            data.get("spend"),
            data.get("comment")
        ))
        db.commit()
        return jsonify({"msg": "ok"})
    

@api.route("/getid/<id>") # egy elem kérése
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

@api.route("/getshops")
def get_shops():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT shop FROM costs GROUP BY shop;")
    ret = [shop[0] for shop in cur.fetchall()]
    return jsonify(ret)