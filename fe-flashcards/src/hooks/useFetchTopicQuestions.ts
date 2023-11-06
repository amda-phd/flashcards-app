import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";

import { fetchTopicQuestions } from "../api/flashcards";
import { setCards } from "../redux/slices/cardsSlice";
import { TopicState } from "../interfaces/Topic";

const useFetchTopicQuestions = () => {
  const id = useSelector((state: TopicState) => state.topic._id);
  const dispatch = useDispatch();

  const { data: questions } = useQuery(
    ["questions", id],
    async () => {
      if (id) {
        const data = await fetchTopicQuestions(id);
        dispatch(setCards(data));
        return data;
      }
    },
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    if (id) {
      fetchTopicQuestions(id);
    }
  }, [id]);

  return questions;
};

export default useFetchTopicQuestions;
