import React, { useState } from "react";
import "../../style.css";

export default function WordTranslate({
  word,
  index,
                                          whatKeyPressed,
  isCorrect,
  showNextWord,
  correctAnswer,
  setCorrectAnswer,
  wrongAnswer,
  setWrongAnswer,
  numberOfStars,
  setNumberOfStars,
  responseShown,
  currentWord,clicked,
  setClicked,
  audioCorrect,
  audioIncorrect,
  soundState,
}) {
  const [buttonClicked, setButtonClicked] = useState(false);

  const classWrongAnswer =
    buttonClicked || whatKeyPressed === index
      ? "wordTranslate wrongAnswer disabled"
      : "wordTranslate";

  const classCorrectAnswer =
    responseShown || clicked
      ? "wordTranslate correctAnswer disabled"
      : "wordTranslate";

  const buttonClassName =
    currentWord?.wordTranslate === word?.wordTranslate
      ? classCorrectAnswer
      : classWrongAnswer;

  return (
    <div>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => {
          let currentStateOfStars;
          setButtonClicked(true);
          setClicked(true);
          if (isCorrect) {
            setCorrectAnswer([...correctAnswer, currentWord]);
            currentStateOfStars = numberOfStars;
            if (soundState) {
              audioCorrect.play();
            }
          }
          if (!isCorrect) {
            setWrongAnswer([...wrongAnswer, currentWord]);
            setNumberOfStars(numberOfStars - 1);
            currentStateOfStars = numberOfStars - 1;
            if (soundState) {
              audioIncorrect.play();
            }
          }
          setTimeout(() => {
            setButtonClicked(false);
            setClicked(false);
            showNextWord(currentStateOfStars);
          }, 500);
        }}
      >
        {index + 1}. {word?.wordTranslate}
      </button>
    </div>
  );
}
