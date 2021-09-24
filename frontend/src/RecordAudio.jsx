import React, { useState } from 'react';
import { useReactMediaRecorder } from './lib/ReactMediaRecorder';
import styles from './RecordAudio.module.css';

function onStop() {
  console.log('Recording stopped');
}

function uploadRecording() {
  console.log('TODO: UPLOAD RECORDING');
}

function RecordAudio({ blackfootPhrase }) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, onStop });

  function toggleRecording() {
    if (status === 'idle' || status === 'stopped') {
      startRecording();
      return;
    }
    stopRecording();
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

      {status === 'recording' && <div className={styles.recordingInProgress}>Recording in progress...</div>}

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
