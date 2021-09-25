from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from utils import make_directory, save_recording

app = Flask(__name__)
cors = CORS(app)


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
        english_term = request.form['english_term']

        # save the audio recording locally for now
        directory = make_directory(english_term) # creates a directory for every unique english term
        save_recording(directory, audio_recording)


        # send a 201 response
        response = jsonify({'message': 'audio recording has successfully been uploaded.'})
        response.status_code = 201
        return response



if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
