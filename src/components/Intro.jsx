import React from "react";
import "./../style.css";
import { Button } from "react-bootstrap";

export default function Intro({ setGameState, setLevelWord }) {
  return (
      <div className="intro-container">
        <h2 className="name-savanna">SAVANNAH</h2>
        {/*<p>*/}
        {/*  Coaching Savannah develops vocabulary. The more words you know the more*/}
        {/*  experience points you get.*/}
        {/*</p>*/}
        <div className="inputLevel__container">
          {" "}
          <p>Select the difficulty level :</p>
          <div>
            <span className="difficultyLevel">1</span>
            <input
                className="inputLevel"
                type="range"
                min="1"
                max="6"
                onChange={(e) => {
                  setLevelWord(e.target.value - 1);
                }}
            />
            <span className="difficultyLevel">6</span>
          </div>
        </div>

        <Button
            variant="dark"
            className="start-button"
            onClick={() => setGameState("countDownSavanna")}
        >
          Start
        </Button>
      </div>
  );
}
