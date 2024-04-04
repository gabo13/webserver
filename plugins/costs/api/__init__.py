"""
costs/api
2024.03.22
"""

print(f'{__name__} loaded')

from flask import Blueprint, request, jsonify, flash
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
    


@api.route("/id/<id>", methods=["GET", "DELETE", "PUT"]) # egy elem kérése
def get_one(id):
    db = get_db()
    cur = db.cursor()
    
    if request.method == "GET":
        cur.execute("SELECT * FROM costs WHERE id = ?;", (id,))
        record = cur.fetchone()
        if not record:
            return jsonify({"msg": f"No valid id: '{id}'"})
        else:
            return jsonify({
                "data": dict(record),
                "msg": "ok",
            })
            
    elif request.method == "DELETE":
        print("delete id:",id)
        cur.execute("DELETE FROM costs WHERE id = ?",(id,))
        db.commit()
        return jsonify({"msg":"delete"})
    
    elif request.method == "PUT":
        data = request.get_json()
        print(data)
        return jsonify({"msg":"edit"})



@api.route("/getshops")
def get_shops():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT shop FROM costs GROUP BY shop;")
    ret = [shop[0] for shop in cur.fetchall()]
    return jsonify(ret)

@api.route("/statistic")
def statistic():
    db = get_db()
    cur = db.cursor()
    queries = {
        "month_details" : "SELECT shop, SUM(spend) as spend FROM costs WHERE month = 1 GROUP BY shop ORDER BY spend DESC;",
        "month_details2" : "select year, month, shop, sum(spend) from costs group by year, month, shop order by year, month, sum(spend) desc;"
    }
    
    cur.execute(queries["month_details2"])
    db_rows = cur.fetchall()
    data_list =[list(row) for row in db_rows]
    #json elkészítése
    month_details = dict()
    for row in data_list:
        #year = row[0]
        #month = row[1]
        #spend_data = row[2:]
        
        if not month_details.get(row[0]):
            month_details[row[0]] = dict()
        if not month_details.get(row[0]).get(row[1]):
            month_details[row[0]][row[1]]= list()
        month_details[row[0]][row[1]].append(row[2:])
    return jsonify(month_details)