from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from utils import make_directory, save_recording_local, upload_to_cloud, analyze_audio
from random import random

app = Flask(__name__)
cors = CORS(app)


@app.route("/")
def index():
    return "Hello World! This is the Blackfoot Language Application's BE."


@app.route('/audio_data', methods=['POST'])
@cross_origin()
def audio_data():
    """
    POST:
        description: save audio recording to cloudinary
        request body:
            required: true
            content:
                multipart/form-data:
                    'recording': <blob>
                    'english_term': <string>
        responses:
            201:
                description: successfully uploaded audio recording
    """
    if request.method == 'POST':
        # extract audio recording and english term
        audio_recording = request.files['recording']
        english_term = request.form['english_term'].lower()
        english_term = english_term.replace(' ', '')
        print(english_term)

        # save the audio recording locally for now
        # directory = make_directory(english_term) # creates a directory for every unique english term
        # save_recording_local(directory, audio_recording)

        # TODO: send audio_recording to do some processing/data validation
        # TODO: maybe perform some analysis on audio_recording?
        #print("-------------!------------")
        #print(audio_recording)
        #print(type(audio_recording))
        #score = analyze_audio(audio_recording, english_term)

        value = random()

        upload_result = upload_to_cloud(audio_recording, english_term) # save audio recording to cloudinary
        response = jsonify({"status": 201, "score": value})
        print(response)

        return response


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
