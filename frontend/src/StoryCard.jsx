import React, { useEffect, useState } from 'react';
import styles from './StoryCard.module.css';
import RecordAudio from './RecordAudio';
import blackfootDictionary from './data/dictionary.json';

const style = styles.englishWord;
const stories = {
  story_1: {
    card_1: {
      term: 'In The Morning',
      sentence: `<span class=${style}>In the morning</span>, I decided to go to the river.`,
    },
    card_2: {
      term: 'Fish',
      sentence: `As I was walking, I remembered a story about a <span class=${style}>fish</span> my grandmother told me.`,
    },
    card_3: {
      term: 'Water',
      sentence: `&quot;Long long ago, the fish would guide the people and help them navigate the world of <span class=${style}>Water<span>.&quot;`,
    },
  },
};

function StoryCard() {
  const [currentCard, setCurrentCard] = useState(1);
  const [term, setTerm] = useState('');
  const [sentence, setSentence] = useState('');
  const [blackfootWord, setBlackfootWord] = useState('');
  const [audioFilename, setAudioFilename] = useState('');

  useEffect(() => {
    const story = stories['story_1'];
    const currentCardKeyname = `card_${currentCard}`;
    const term = story[currentCardKeyname].term;
    const translation = blackfootDictionary[term].translation;
    const wavFile = blackfootDictionary[term].audio;
    setTerm(term);
    setSentence(story[currentCardKeyname].sentence);
    if (translation) {
      setBlackfootWord(translation);
    }
    if (wavFile) {
      setAudioFilename(
        `https://blackfoot-wav-files.s3.us-east-2.amazonaws.com/${wavFile}`
      );
    }
    const audioControl = document.querySelector('#playit');
    if (audioControl) {
      audioControl.load();
    }
  });

  function visitNextCard() {
    if (currentCard < Object.keys(stories['story_1']).length) {
      setCurrentCard(currentCard + 1);
    }
  }

  function visitPreviousCard() {
    if (currentCard > 1) {
      setCurrentCard(currentCard - 1);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.cardNav}>
          <button
            className={styles.cardButtonPrev}
            onClick={visitPreviousCard}
            disabled={currentCard === 1}
          ></button>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.blackfootWord}>{blackfootWord}</div>
          <div dangerouslySetInnerHTML={{ __html: sentence }}></div>
          <div className={styles.audioControls}>
            <audio id="playit" controls>
              <source src={audioFilename} type="audio/wav" />
              Your browser does not support the audio element
            </audio>
          </div>
        </div>

        <div className={styles.cardNav}>
          <button
            className={styles.cardButtonNext}
            onClick={visitNextCard}
            disabled={currentCard === Object.keys(stories['story_1']).length}
          ></button>
        </div>
      </div>
      <div className={styles.cardBottom}>
        <RecordAudio
          englishPhrase={term}
          blackfootPhrase={blackfootWord}
        ></RecordAudio>
      </div>
    </div>
  );
}

export default StoryCard;
