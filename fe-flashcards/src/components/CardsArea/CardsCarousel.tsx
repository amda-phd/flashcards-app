import React, { useState } from "react";
import { useSelector } from "react-redux";

import useFetchAnswer from "../../hooks/useFetchAnswer";
import { TopicState } from "../../interfaces/Topic";

import "../../styles/CardsCarousel.css";

const CardsCarousel: React.FC = () => {
  const topic = useSelector((state: TopicState) => state.topic);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const { cards, handleSeeAnswer, mutation } = useFetchAnswer(
    currentCard,
    setShowAnswer
  );

  const goToNextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  };

  const goToPreviousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="CardsCarousel">
      <h2>{`You're currently learning about ${topic.name}, ${topic.level} level`}</h2>
      {cards.length > 0 && (
        <div>
          <div>
            <button onClick={goToPreviousCard}>Previous</button>
            <button onClick={goToNextCard}>Next</button>
          </div>
          <div>
            <h3>Question:</h3>
            <p>{cards[currentCard].question}</p>
            <button onClick={handleSeeAnswer}>See answer</button>
            {mutation.isLoading && <div>Loading answer...</div>}
            {showAnswer && (
              <div>
                <h3>Answer:</h3>
                <p>{cards[currentCard].answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardsCarousel;
