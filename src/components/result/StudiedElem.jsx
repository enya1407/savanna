import React from "react";
import "../../style.css";
import imgSound from "../../Savanna/sound.svg";

const DATA_URL =
  "https://raw.githubusercontent.com/SavichAnastasia/rslang-data/master/";

export default function StudiedElem({ el }) {
  const audio = new Audio(`${DATA_URL}${el.audio}`);
  return (
    <div>
      {" "}
      <button
        type="button"
        className="audioWord-button"
        onClick={() => audio.play()}
      >
        <img className="audioWord" src={imgSound} alt={audio} />
      </button>
      {el.word} &mdash; {el.wordTranslate},{" "}
    </div>
  );
}
