import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import http from './lib/http-common';
import styles from './RecordAudio.module.css';

function RecordAudio({ blackfootPhrase, englishPhrase }) {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  function toggleRecording() {
    if (status === 'idle' || status === 'stopped') {
      startRecording();
      return;
    }
    stopRecording();
  }

  async function uploadRecording() {
    if (mediaBlobUrl) {
      let blob = await fetch(mediaBlobUrl).then((r) => r.blob());

      const form = new FormData();
      form.append('recording', blob, 'recording.wav');
      form.append('english_term', englishPhrase);

      try {
        const results = await http.post(`/audio_data`, form, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
          },
          timeout: 30000,
        });
        clearBlobUrl();
      } catch (e) {
        console.log(e.toJSON());
      }
    }

    // otherwise no audio blob to upload
  }

  return (
    <div className={styles.recordingWrapper}>
      {status === 'idle' && (
        <button
          onClick={toggleRecording}
          title="Start recording"
          className={styles.recordingButton}
        >
          {/* <span><img className={styles.icon} src="/icons/microphone.png" /></span> */}
        </button>
      )}

      {status === 'idle' && (
        <div className={styles.instructions}>
          Record your own pronunciation of the Blackfoot word{' '}
          <span className={styles.blackfootPhrase}>{blackfootPhrase}</span>.
        </div>
      )}

      {status === 'idle' && (
        <div className={styles.instructions}>
          If you choose to upload your recording, the audio will be used for
          Blackfoot language analysis in order to allow us to build a better
          library of Blackfoot language recordings. No personally identifiable
          information is saved with your upload.
          {/* Additional thoughts to simplify: By using this site's audio-recording feature, you are consenting to your voice being stored and analyzed. No personal information is saved and your recordings will be anonymous. */}
        </div>
      )}

      {status === 'recording' && (
        <div className={styles.recordingInProgress}>
          Recording in progress...{' '}
          <button
            onClick={toggleRecording}
            title="Stop recording"
            className={styles.stopRecordingButton}
          >
            Stop
          </button>
        </div>
      )}

      {/* <div>{status}</div> */}

      {status === 'stopped' && (
        <>
          <audio
            src={mediaBlobUrl}
            controls
            autoPlay
            className={styles.playRecorded}
          />
          <div>
            <button className={styles.saveButton} onClick={uploadRecording}>
              Save Recording
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecordAudio;
