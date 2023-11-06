import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { fetchAnswer } from "../api/flashcards";
import { CardsState } from "../interfaces/Card";
import { setCards } from "../redux/slices/cardsSlice";

interface RootState {
  cards: CardsState;
}

const useFetchAnswer = (
  currentCard: number,
  setShowAnswer: (set: boolean) => void
) => {
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();

  const mutation = useMutation((cardId: string) => fetchAnswer(cardId), {
    onMutate: async (cardId) => {
      // Optional: You can perform additional actions before the mutation starts.
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      // Update the cardsSlice with the new answer for the current card
      const updatedCards = [...cards];
      updatedCards[currentCard] = data;
      dispatch(setCards(updatedCards));
    },
  });

  const handleSeeAnswer = () => {
    if (!cards[currentCard]?.answer) mutation.mutate(cards[currentCard]?._id);
    setShowAnswer(true);
  };

  return {
    cards,
    handleSeeAnswer,
    mutation,
  };
};

export default useFetchAnswer;
