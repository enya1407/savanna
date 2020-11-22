import React from "react";
import "../../style.css";
import StudiedElem from "./StudiedElem";

export default function DetailedResults({ correctAnswer, wrongAnswer }) {
  const showCorrectAnswer = correctAnswer.map((el) => {
    return <StudiedElem key={el?.word} el={el} />;
  });

  const showWrongAnswer = wrongAnswer.map((el) => {
    return <StudiedElem key={el?.word} el={el} />;
  });

  return (
    <div className="result result-detailed">
      <h4 className="error__title">mistakes: {wrongAnswer.length} </h4>

      {showWrongAnswer}

      <h4 className="right-answers__title">I know: {correctAnswer.length}</h4>
      {showCorrectAnswer}
    </div>
  );
}
