import React, { useEffect, useState } from "react";
import "../../style.css";
import correctAudio from "../../Savanna/correct.mp3";
import correct2Audio from "../../Savanna/correct2.mp3";
import incorrectAudio from "../../Savanna/error.mp3";
import WordTranslate from "./WordTranslate";
import Word from "./Word";

export default function Game({
  setGameState,
  setStarVisible,
  numberOfStars,
  setNumberOfStars,
  correctAnswer,
  setCorrectAnswer,
  wrongAnswer,
  setWrongAnswer,
  soundState,
  arrCurentWord,keyPressed,setKeyPressed}) {
  const [roundWordsToStudy, setRoundWordsToStudy] = useState([]);
  const [roundWordsForTranslation, setRoundWordsForTranslation] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [responseShown, setResponseShown] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [whatKeyPressed, setWhatKeyPressed] = useState(null);
  const [level, setLevel] = useState(1);
  const [wordsToLevelUp, setWordsToLevelUp] = useState(4)

  const currentWord = roundWordsToStudy[roundWordsToStudy.length - 1];
  const wordsInTheGame = 20;
  const keysForPlaying = ["1", "2", "3", "4"];
  let interval;
  const audioCorrect = new Audio(correctAudio);
  const audioIncorrect = new Audio(incorrectAudio);
  const audioLevelUp = new Audio(correct2Audio);
  const levelClassName = `progress-element level-${level}`;

  const randomWordsToLearn = (currentRoundWordsCount, words, currWord) => {
    const roundWords = words.filter((word) => word?.word !== currWord?.word);

    for (let i = roundWords.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = roundWords[j];
      roundWords[j] = roundWords[i];
      roundWords[i] = temp;
    }

    return roundWords.splice(0, currentRoundWordsCount);
  };

  const generateWordsTranslate = (currWord, words) => {
    const WordsTranslate = randomWordsToLearn(3, words, currWord);
    WordsTranslate.push(currWord);

    return randomWordsToLearn(4, WordsTranslate);
  };

  const showNextWord = (stars) => {
    if (roundWordsToStudy.length > 1 && stars > 0) {
      setRoundWordsToStudy(roundWordsToStudy.slice(0, -1));
    } else {
      setNumberOfStars(5);
      clearInterval(timerId);
      clearTimeout(interval);
      setGameState("resultSavanna");
    }
  };

  const playSound = () => {
    const soundEnabled = JSON.parse(window.localStorage.getItem("soundState"));
    if (soundEnabled) {
      audioIncorrect.play();
    }
  };

  const timerShowNextWord = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    setTimerId(
      (interval = setInterval(() => {
        setResponseShown(true);
        setWrongAnswer([...wrongAnswer, currentWord]);
        setNumberOfStars(numberOfStars - 1);
        playSound();

        setTimeout(() => {
          showNextWord(numberOfStars - 1);
          setResponseShown(false);
        }, 500);
      }, 4400))
    );
  };

  const showCorrectAnswerKeydown = (e, sound, stars) => {
    setKeyPressed(true)
    let currentStateOfStars;
    setResponseShown(true);
    setWhatKeyPressed(keysForPlaying.indexOf(e));
      if (
          roundWordsForTranslation.indexOf(currentWord) ===
          keysForPlaying.indexOf(e)
      ) {
        setCorrectAnswer([...correctAnswer, currentWord]);
        currentStateOfStars = stars;
        if (sound) {
          audioCorrect.play();
        }
      } else if (
          roundWordsForTranslation.indexOf(currentWord) !==
          keysForPlaying.indexOf(e)
      ) {
        setWrongAnswer([...wrongAnswer, currentWord]);
        setNumberOfStars(numberOfStars - 1);
        currentStateOfStars = stars - 1;
        if (sound) {
          audioIncorrect.play();
        }
    }
    setTimeout(() => {
      setResponseShown(false);
      showNextWord(currentStateOfStars);
      setWhatKeyPressed(null);
    }, 500);

  };

  const wordTranslateElements = roundWordsForTranslation.map((word, index) => {
    const isCorrect = currentWord?.wordTranslate === word?.wordTranslate;
    return (
      <WordTranslate
        key={word?.word}
        word={word}
        index={index}
        whatKeyPressed={whatKeyPressed}
        isCorrect={isCorrect}
        showNextWord={showNextWord}
        correctAnswer={correctAnswer}
        setCorrectAnswer={setCorrectAnswer}
        wrongAnswer={wrongAnswer}
        setWrongAnswer={setWrongAnswer}
        numberOfStars={numberOfStars}
        setNumberOfStars={setNumberOfStars}
        responseShown={responseShown}
        currentWord={currentWord}
        clicked={clicked}
        setClicked={setClicked}
        audioCorrect={audioCorrect}
        audioIncorrect={audioIncorrect}
        soundState={soundState}
      />
    );
  });

  useEffect(() => {

    setStarVisible(true);
    setRoundWordsToStudy(randomWordsToLearn(wordsInTheGame, arrCurentWord));
  }, [arrCurentWord]);

  useEffect(() => {
    setKeyPressed(false)
    timerShowNextWord(soundState);
    setRoundWordsForTranslation(
      generateWordsTranslate(currentWord, arrCurentWord)
    );
  }, [roundWordsToStudy]);

  useEffect(() => {
    if(!keyPressed){
      const keyDownHandler = (e) => {
        if (keysForPlaying.includes(e.key)) {
          if (!roundWordsToStudy.length) {
            return;
          }
          showCorrectAnswerKeydown(e.key, soundState, numberOfStars);

    }

    };

    document.addEventListener("keydown", keyDownHandler, false);

    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);

    };
    }

  }, [roundWordsForTranslation, soundState, numberOfStars]);

  useEffect(() => {
    if (!wordsToLevelUp) {
      setTimeout(() => {
        setLevel(level + 1);
        setWordsToLevelUp(2);
        if (soundState) {
          audioLevelUp.play();
        }
      }, 200);
    } else {
      setWordsToLevelUp(wordsToLevelUp - 1);
    }
  }, [correctAnswer, soundState]);

  return (
    <div className="game-container" role="button" tabIndex="0">
      <Word key={roundWordsToStudy.join("")} word={currentWord?.word} />
      <div className="wordTranslate-container">{wordTranslateElements}</div>
      <div className="levelContainer">
        <div className={levelClassName} />
      </div>
    </div>
  );
}
