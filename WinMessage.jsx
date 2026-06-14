import React from "react";

function WinMessage({ show }) {
  if (!show) return null;

  return (
    <div className="winner">
      <h2>🎉 Congratulations!</h2>
      <p>You matched all the cards.</p>
    </div>
  );
}

export default WinMessage;