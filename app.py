import importlib
import pkgutil
import plugins
from flask import Flask, send_from_directory, render_template, jsonify, request
import time
from flask_cors import CORS
print(f'{__name__} loaded')

def create_app():
    app =  Flask(__name__)
    for _, name, _ in pkgutil.iter_modules(plugins.__path__, plugins.__name__ + "."):
        module =  importlib.import_module(name)
        try:
            app.register_blueprint(getattr(module, "blueprint_plugin"))
        except Exception as e:
            print("Exception: ", e)

    app.config['DATABASE']='/home/pi/AUTOMAT/webserver2/data/database.sqlite'
    import db
    db.init_app(app)
    CORS(app)
    
    return(app)

app = create_app()


@app.route('/')
def index():
    
    return render_template("index.html")


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'images/favicon.ico', mimetype='image/vnd.microsoft.icon')
###############
#
# Lotto api
#
lotto_file_access = False
filename = "/home/pi/AUTOMAT/lotto/emailforall.txt"


def read_subscribers():
    global lotto_file_access
    while lotto_file_access:
        time.sleep(1)
    lotto_file_access = True
    with open(filename,"rt") as f:
        subscribers = [email.strip() for email in f]
        lotto_file_access = False
        return subscribers


def write_subscribers(subscribers):
    global lotto_file_access
    while lotto_file_access:
        time.sleep(1)
    lotto_file_access = True
    with open(filename,"wt") as f:
        for email in subscribers:
            f.write(email+"\n")
        lotto_file_access =False


   
@app.route('/lotto/subscribe/')
def lotto():
    return render_template("lottosubscribe.html")

@app.route('/lotto/subscribe/api', methods=["POST"])
def lottoapi():
    json_data = request.get_json()
    email = json_data.get("email")
    subscribers = read_subscribers()
    if email in subscribers:
        print("leiratkozas", subscribers)
        subscribers.remove(email)
        write_subscribers(subscribers)
        return jsonify({"msg": "Sikeresen leiratkoztál!"})
    else:
        print("leiratkozas", subscribers)
        subscribers.append(email)
        write_subscribers(subscribers)
        return jsonify({"msg": "Sikeres feliratkozás!"})
#
# Lotto api end
#
####################
rules = [rule.rule for rule in app.url_map.iter_rules()]
rules.sort()
print("*****RULES: *****")
print(*rules,sep="\n")


if __name__ == "__main__":
    app.run(host= '0.0.0.0', port=8080, debug=True)
