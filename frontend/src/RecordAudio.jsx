import React, { useState } from 'react';
import { useReactMediaRecorder } from './lib/ReactMediaRecorder';
import http from './lib/http-common';
import styles from './RecordAudio.module.css';

function RecordAudio({ blackfootPhrase, englishPhrase }) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
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

      return await http.post(`/audio_data`, form, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        },
        timeout: 30000,
      });
    }

    // otherwise
    console.log('no audio blob');
  }

  return (
    <div className={styles.recordingWrapper}>
      <div>
        Would you like to record your pronunciation of{' '}
        <span className={styles.blackfootPhrase}>{blackfootPhrase}</span>?
      </div>

      <button onClick={toggleRecording} className={styles.recordingButton}>
        {status === 'recording' ? (
          <>
            <span>Stop recording</span>
          </>
        ) : (
          <span>Start recording</span>
        )}
      </button>

      {status === 'recording' && (
        <div className={styles.recordingInProgress}>
          Recording in progress...
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
          <button onClick={uploadRecording}>Upload Recording</button>
        </>
      )}
    </div>
  );
}

export default RecordAudio;
