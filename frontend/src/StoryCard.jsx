import React from 'react';
import styles from './StoryCard.module.css';
import RecordAudio from './RecordAudio'

const stories = [{
  1: {
    term: 'fish',
    sentence: 'A long, long, long time ago there once lived a {term}',
  },
  2: {
    term: 'raven',
    sentence: 'A long, long, long time ago there once lived a {term}',
  },
}];
function StoryCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.blackfootWord}>mamii</div>
        <div>
          A long, long, long time ago there once lived a{' '}
          <span className={styles.englishWord}>fish</span>.
        </div>
        <div className={styles.audioControls}>
          <audio controls>
            <source src="/audio/fish.wav" type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <RecordAudio blackfootPhrase={'mamii'}></RecordAudio>
      </div>

      <div className={styles.cardNext}>Next&nbsp;&gt;</div>
    </div>
  );
}

export default StoryCard;
