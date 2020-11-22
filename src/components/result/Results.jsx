import React, { useState, useEffect } from "react";
import "../../style.css";
import { Button } from "react-bootstrap";
import endAudio from "../../Savanna/end.mp3";
// import { Link } from "react-router-dom";
import GeneralResults from "./GeneralResults";
import DetailedResults from "./DetailedResults";

export default function Results({
  setGameState,
  correctAnswer,
  setCorrectAnswer,
  wrongAnswer,
  setWrongAnswer,
  setStarVisible,
  soundState,
}) {
  const audioEnd = new Audio(endAudio);

  const [detailedResultsShown, setDetailedResultsShown] = useState(false);
  useEffect(() => {
    setStarVisible(false);
    if (soundState) {
      audioEnd.play();
    }
  }, []);

  const howWellPassedLevel = () => {
    if (wrongAnswer.length === 0) {
      return <h3>Well done!</h3>;
    }
    if (wrongAnswer.length >= correctAnswer.length) {
      return <h3>This time it didn’t work out, but keep practicing!</h3>;
    }
    return <h3>Not bad, but there is work to do!</h3>;
  };

  const rightButtonClassName = detailedResultsShown
    ? "carousel carousel_active"
    : "carousel ";

  const leftButtonClassName = !detailedResultsShown
    ? "carousel carousel_active"
    : "carousel ";

  return (
    <div className="results-container">
      {howWellPassedLevel()}

      {!detailedResultsShown && (
        <GeneralResults
          setDetailedResultsShown={setDetailedResultsShown}
          correctAnswer={correctAnswer}
          wrongAnswer={wrongAnswer}
        />
      )}
      {detailedResultsShown && (
        <DetailedResults
          correctAnswer={correctAnswer}
          wrongAnswer={wrongAnswer}
        />
      )}

      <div>
        {" "}
        <button
          type="button"
          className={leftButtonClassName}
          onClick={() => setDetailedResultsShown(false)}
        />
        <button
          type="button"
          className={rightButtonClassName}
          onClick={() => setDetailedResultsShown(true)}
        />
      </div>

      <div>
        <Button
          variant="dark"
          className="results-button"
          onClick={() => {
            setGameState("introSavanna");
            setWrongAnswer(wrongAnswer?.slice(wrongAnswer.length));
            setCorrectAnswer(correctAnswer?.slice(correctAnswer.length));
          }}
        >
          Start over
        </Button>
      </div>
    </div>
  );
}
