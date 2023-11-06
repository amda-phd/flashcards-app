import React from "react";

import useFetchTopicQuestions from "../../hooks/useFetchTopicQuestions";
import CardsCarousel from "./CardsCarousel";

import "../../styles/TopicCards.css";

const TopicCards: React.FC = () => {
  const questions = useFetchTopicQuestions();

  return (
    <div className="TopicCards">
      {questions ? (
        <CardsCarousel />
      ) : (
        <h2>Select or create a new topic and start learning!</h2>
      )}
    </div>
  );
};

export default TopicCards;
