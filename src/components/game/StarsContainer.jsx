import React from "react";
import "../../style.css";
import Star from "./Star";

export default function StarsContainer({ numberOfStars }) {
  const starsArr = [];
  for (let i = 5; i > 0; i -= 1) {
    const win = numberOfStars >= i;

    starsArr.push(<Star win={win} key={i} />);
  }

  return <div className="star-container">{starsArr}</div>;
}
