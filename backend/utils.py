from pathlib import Path
from datetime import datetime
import os


def make_directory(directory_name):
    """Create a directory if it does not exist.

    Returns: A string of the created path name.
    """
    path_name = os.path.join(os.getcwd(), 'audio_data', directory_name)
    Path(path_name).mkdir(parents=True, exist_ok=True)
    return path_name


def save_recording(path, file):
    """Save file in the path with the current date and time as the filename"""
    now = datetime.now()
    date_time = now.strftime("%m.%d.%Y, %H-%M-%S").replace(' ', '').replace(',', '_') # example: 12/31/2020-05:30:14

    filename = os.path.join(path, date_time) + ".wav"
    file.save(filename)
