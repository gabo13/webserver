"""
* work application
* 2024.06.24
"""

print(f'{__name__} loaded')

from flask import Blueprint, render_template


blueprint_plugin = Blueprint("work", __name__, url_prefix="/work", template_folder="templates", static_folder="static")

@blueprint_plugin.route("/")
def work_main():
    return render_template("ccl_main.html")

@blueprint_plugin.route("/darabszam")
def work_darabszam():
    return render_template("darabszam.html")

@blueprint_plugin.route("/evo5")
def work_evo5():
    return render_template("evo5.html")

@blueprint_plugin.route("/gepszamok")
def work_gepszamok():
    return render_template("gepszamok.html")

@blueprint_plugin.route("/koszorukovek")
def work_koszorukovek():
    return render_template("koszorukovek.html")

@blueprint_plugin.route("/nullpont")
def work_nullpont():
    return render_template("nullpont.html")

@blueprint_plugin.route("/okossagok")
def work_okossagok():
    return render_template("okossagok.html")

@blueprint_plugin.route("/selejt")
def work_selejt():
    return render_template("selejt.html")

@blueprint_plugin.route("/torzsszamok")
def work_torzsszamok():
    return render_template("torzsszamok.html")

@blueprint_plugin.route("/tpm")
def work_tpm():
    return render_template("tpm.html")