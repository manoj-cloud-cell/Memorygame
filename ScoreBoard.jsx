import React from "react";

function ScoreBoard({ turns, matchedPairs }) {
  return (
    <div className="score-board">
      <h3>🎯 Turns: {turns}</h3>
      <h3>✅ Matched Pairs: {matchedPairs}</h3>
    </div>
  );
}

export default ScoreBoard;