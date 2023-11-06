import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

import { createTopic } from "../api/flashcards";
import { setSelectedTopic } from "../redux/slices/topicSlice";
import { TopicBase } from "../interfaces/Topic";

const useCreateTopic = (onClose: () => void) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("beginner");
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation(
    async () => createTopic({ name, level } as TopicBase),
    {
      onSuccess: (newTopic) => {
        queryClient.invalidateQueries("topics"); // Refresh the topics list after creating a new one
        dispatch(setSelectedTopic(newTopic));
        onClose();
      },
    }
  );

  const handleCreateClick = () => {
    mutation.mutate();
  };

  return { name, setName, level, setLevel, mutation, handleCreateClick };
};

export default useCreateTopic;
