"""
* costs application
* 2024.03.22
"""

print(f'{__name__} loaded')

from flask import Blueprint, render_template
from .api import api

blueprint_plugin = Blueprint("costs", __name__, url_prefix="/costs", template_folder="templates", static_folder="static")
blueprint_plugin.register_blueprint(api)


@blueprint_plugin.route("/")
def index():
    return render_template("index.html")


