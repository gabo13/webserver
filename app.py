import importlib
import pkgutil
import plugins
from flask import Flask, send_from_directory, render_template
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



rules = [rule.rule for rule in app.url_map.iter_rules()]
rules.sort()
print("*****RULES: *****")
print(*rules,sep="\n")


if __name__ == "__main__":
    app.run(host= '0.0.0.0', port=8080, debug=True)
