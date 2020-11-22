import React from "react";
import "../../style.css";

export default function Star({ win }) {
  const starClassName = win ? "star star-win" : "star star-err";
  return <div className={starClassName} />;
}
