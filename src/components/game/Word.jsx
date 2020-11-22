import React from "react";
import "../../style.css";

export default function Word({ word }) {
  return (
    <div className="word marquee">
      <span className="studiedWord">{word}</span>
    </div>
  );
}
