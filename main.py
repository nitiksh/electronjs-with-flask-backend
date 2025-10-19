from flask import Flask, request, jsonify, render_template
from datetime import datetime

app = Flask(__name__)


@app.route("/", methods=["GET"])
def hello():
    return render_template("index.html"), 200


@app.route("/health", methods=["GET"])
def health():
    return "This is a Flask Server Health Check. Everything is working!", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
