from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route("/", methods=["GET"])
def hello():
    return render_template("index.html"), 200


@app.route("/health", methods=["GET"])
def health():
    return "This is a Flask Server Health Check. Everything is working!", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500, debug=True)
