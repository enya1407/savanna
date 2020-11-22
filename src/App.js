import React, { useState, useEffect } from "react";
import "./style.css";
import Intro from "./components/Intro";
import HeaderSavanna from "./components/HeaderSavanna";
import Game from "./components/game/Game";
import Results from "./components/result/Results";
import CountDown from "./components/CountDown";
import Loading from "./components/Loading";

const App = () => {
  const [gameState, setGameState] = useState("introSavanna");
  const [timerState, setTimerState] = useState(3);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const [soundState, setSoundState] = useState(true);
  const [starVisible, setStarVisible] = useState(false);
  const [numberOfStars, setNumberOfStars] = useState(5);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [levelWord, setLevelWord] = useState(5);
  const [arrCurentWord, setArrCurentWord] = useState([]);
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("soundState", soundState);
  }, [soundState]);

  useEffect(() => {
    window.localStorage.setItem("soundState", true);
  }, []);

  return (
      <div className="savanna">
        <div className="text-center">
          {spinnerVisible && <Loading setSpinnerVisible={setSpinnerVisible} />}
        </div>
        {!spinnerVisible && (
            <div className="wrapper">
              <HeaderSavanna
                  setSoundState={setSoundState}
                  soundState={soundState}
                  starVisible={starVisible}
                  numberOfStars={numberOfStars}
              />
              <div className="main-savanna__container">
                {gameState === "introSavanna" && (
                    <Intro setGameState={setGameState} setLevelWord={setLevelWord} />
                )}
                {gameState === "countDownSavanna" && (
                    <CountDown
                        setGameState={setGameState}
                        timerState={timerState}
                        setTimerState={setTimerState}
                        soundState={soundState}
                        levelWord={levelWord}
                        setArrCurentWord={setArrCurentWord}
                    />
                )}
                {gameState === "gameSavanna" && (
                    <Game
                        setGameState={setGameState}
                        setStarVisible={setStarVisible}
                        numberOfStars={numberOfStars}
                        setNumberOfStars={setNumberOfStars}
                        correctAnswer={correctAnswer}
                        setCorrectAnswer={setCorrectAnswer}
                        wrongAnswer={wrongAnswer}
                        setWrongAnswer={setWrongAnswer}
                        soundState={soundState}
                        arrCurentWord={arrCurentWord}
                        keyPressed={keyPressed}
                        setKeyPressed={setKeyPressed}
                    />
                )}
                {gameState === "resultSavanna" && (
                    <Results
                        setGameState={setGameState}
                        correctAnswer={correctAnswer}
                        setCorrectAnswer={setCorrectAnswer}
                        wrongAnswer={wrongAnswer}
                        setWrongAnswer={setWrongAnswer}
                        setStarVisible={setStarVisible}
                        soundState={soundState}
                    />
                )}
              </div>

            </div>
        )}
      </div>
  );
};

export default App;

