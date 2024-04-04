"""
* costs application
* 2024.03.22
"""

from flask import Blueprint, render_template
from .api import api

blueprint_plugin = Blueprint("costs", __name__, url_prefix="/costs", template_folder="templates", static_folder="static")
blueprint_plugin.register_blueprint(api)


@blueprint_plugin.route("/")
def index():
    return render_template("costs.html")

@blueprint_plugin.route("/statistic")
def statistic():
    return render_template("statistic.html")