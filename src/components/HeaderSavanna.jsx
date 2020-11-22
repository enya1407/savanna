import React from "react";
import "./../style.css";
import StarsContainer from "./game/StarsContainer";

export default function HeaderSavanna({
                                        setSoundState,
                                        soundState,
                                        starVisible,
                                        numberOfStars,
                                      }) {
  const soundClassName = ["sound"];
  if (soundState) {
    soundClassName.push("sound-on");
  } else {
    soundClassName.push("sound-off");
  }

  return (
      <div className="header-savanna">
        <button
            type="button"
            className={soundClassName.join(" ")}
            onClick={() => setSoundState(!soundState)}
        >
          sound
        </button>
        {starVisible && <StarsContainer numberOfStars={numberOfStars} />}

      </div>
  );
}
