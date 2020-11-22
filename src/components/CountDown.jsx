import React, { useEffect } from "react";
import "./../style.css";
import countDownAudio from "./../Savanna/gong.mp3";
import imgKeyboard from "./../Savanna/keyboard.svg";
import getWords from "../getWords";

export default function CountDown({
  setGameState,
  timerState,
  setTimerState,
  soundState,
  setArrCurentWord,
  levelWord,
}) {
  const audio = new Audio(countDownAudio);
  useEffect(() => {
    if (soundState) {
      audio.play();
    }
    const randomPage = Math.floor(Math.random() * 30);
    getWords(randomPage, levelWord).then((data) => {
      setArrCurentWord(data);
    });
  }, []);

  function runTimer() {
    const timerId = setInterval(() => setTimerState(timerState - 1), 1400);
    setTimeout(() => {
      clearInterval(timerId);
      setTimerState(3);
      setGameState("gameSavanna");
    }, 3000);
  }
  return (
    <div className="countDown-container">
      {runTimer()}
      <div className="timer">{timerState}</div>
      <div>
        <img src={imgKeyboard} className="img-keyboard" alt="imgKeyboard" />
        <p className="instruction">
          Используй клавиши 1, 2, 3 и 4, чтобы дать быстрый ответ
        </p>
      </div>
    </div>
  );
}
