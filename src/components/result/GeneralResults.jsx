import React from "react";
import "../../style.css";

export default function GeneralResults({
  setDetailedResultsShown,
  correctAnswer,
  wrongAnswer,
}) {
  return (
    <div className="result">
      <div>
        <div
          className="result-link"
          onClick={() => setDetailedResultsShown(true)}
          onKeyPress={() => setDetailedResultsShown(true)}
          role="button"
          tabIndex="0"
        >
          {correctAnswer.length} words studied, {wrongAnswer.length} on studying
        </div>
      </div>
    </div>
  );
}
