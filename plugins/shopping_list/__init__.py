print(f'{__name__} loaded')

from flask import Blueprint

blueprint_plugin = Blueprint("plugin_2", __name__, url_prefix="/plugin_1")

@blueprint_plugin.route("/")
def index():
    return 'BLUEPRINT_1 PLUGIN'
