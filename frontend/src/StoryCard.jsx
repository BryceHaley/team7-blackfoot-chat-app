import React, { useEffect, useState } from 'react';
import styles from './StoryCard.module.css';
import RecordAudio from './RecordAudio';
import http from './lib/http-common';

// Brainstorming data structure for representing a list of stories
// and the individual cards that go with each story.
const stories = {
  story_1: {
    card_1: {
      term: 'fish',
      sentence: 'A long, long, long time ago there once lived a {term}',
    },
    card_2: {
      term: 'raven',
      sentence: 'A long, long, long time ago there once lived a {term}',
    },
  },
  story_2: {
    card_1: {},
    card_2: {},
  },
};

function StoryCard() {
  const [blackfootWord, setBlackfootWord] = useState('mamii');

  async function retrieveBlackfootTranslation() {
    const results = await http.post('/audio_data', { english_term: 'fish' });

    // TODO: API needs to return Blackfoot word
    const blackfootWord = results?.data?.blackfoot_term || 'mamii';
    setBlackfootWord(blackfootWord);
  }

  useEffect(() => {
    retrieveBlackfootTranslation();
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.blackfootWord}>{blackfootWord}</div>
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

        <RecordAudio englishPhrase={'fish'} blackfootPhrase={blackfootWord}></RecordAudio>
      </div>

      <div className={styles.cardNext}>Next&nbsp;&gt;</div>
    </div>
  );
}

export default StoryCard;
