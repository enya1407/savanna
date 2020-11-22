import React from "react";
import "./../style.css";
import { Spinner } from "react-bootstrap";

export default function Loading({ setSpinnerVisible }) {
  function spinnerTimer() {
    setTimeout(
      () => setSpinnerVisible(false),

      1000
    );
  }

  return (
    <div className="spinner-container">
      {spinnerTimer()}
      <Spinner animation="border" />
    </div>
  );
}
