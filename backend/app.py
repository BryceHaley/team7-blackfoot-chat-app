from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def index():
    return "Hello World! Welcome to the Blackfoot Language Application."


@app.route('/audio_data', methods=['POST'])
@cross_origin()
def audio_data():
    if request.method == 'POST':
        request_data = request.get_json()
        english_term = request_data['english_term']
        # audio_file = request.files['audio']

        return jsonify({'response': 'audio file received.', 'english_term': english_term})



if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)