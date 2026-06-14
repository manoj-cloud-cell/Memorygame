import React from "react";

function Card({
  card,
  handleChoice,
  choiceOne,
  choiceTwo,
  disabled,
}) {
  const flipped =
    card === choiceOne ||
    card === choiceTwo ||
    card.matched;

  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-inner">
        {flipped ? (
          <span className="emoji">{card.src}</span>
        ) : (
          <span className="emoji">❓</span>
        )}
      </div>
    </div>
  );
}

export default Card;