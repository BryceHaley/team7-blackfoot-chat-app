from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World! Welcome to the Blackfoot Language Application."