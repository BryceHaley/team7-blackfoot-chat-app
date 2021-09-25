from pathlib import Path
from datetime import datetime
import cloudinary
from cloudinary import uploader, api
from dotenv import load_dotenv
import os


# for saving locally
def make_directory(directory_name):
    """Create a directory if it does not exist.

    Returns: A string of the created path name.
    """
    path_name = os.path.join(os.getcwd(), 'audio_data', directory_name)
    Path(path_name).mkdir(parents=True, exist_ok=True)
    return path_name


# for saving locally
def save_recording_local(path, file):
    """Save file in the path with the current date and time as the filename."""
    now = datetime.now()
    date_time = now.strftime("%m.%d.%Y, %H-%M-%S").replace(' ', '').replace(',', '_') # example: 12/31/2020-05:30:14

    filename = os.path.join(path, date_time) + ".wav"
    file.save(filename)


def upload_to_cloud(file, english_term):
    """Save audio recording to Cloudinary with the english term as the directory and the current date and time as the filename."""
    if 'CLOUD_NAME' not in os.environ.keys(): # check if local dev or heroku prod
        load_dotenv()

    cloudinary.config(cloud_name = os.environ['CLOUD_NAME'], api_key=os.environ['API_KEY'],
    api_secret=os.environ['API_SECRET'])

    now = datetime.now()
    date_time = now.strftime("%m.%d.%Y, %H-%M-%S").replace(' ', '').replace(',', '_')
    folder_name = f'audio_recordings/{english_term}'

    upload_result = cloudinary.uploader.upload(file,
      folder = folder_name,
      use_filename = True,
      filename_override = date_time,
      resource_type = "auto")

    return upload_result
