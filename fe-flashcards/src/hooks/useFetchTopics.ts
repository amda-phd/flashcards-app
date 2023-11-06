import { useQuery } from "react-query";

import { fetchTopics } from "../api/flashcards";
import { TopicItem } from "../interfaces/Topic";

const useFetchTopics = () => {
  const { data } = useQuery<TopicItem[]>("menuItems", fetchTopics);

  return data;
};

export default useFetchTopics;
