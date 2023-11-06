import axios from "axios";
import { TopicBase } from "../interfaces/Topic";

const url = import.meta.env.VITE_BACKEND_URL;

export const fetchAnswer = async (cardId: string) => {
  const response = await axios.put(`${url}cards/${cardId}/answer`);
  return response.data;
};

export const fetchTopicQuestions = async (topicId: string) => {
  const response = await axios.get(`${url}cards?topic_id=${topicId}`);
  return response.data;
};

export const fetchTopics = async () => {
  const response = await axios.get(`${url}topics`);
  return response.data;
};

export const createTopic = async (newTopic: TopicBase) => {
  const response = await axios.post(`${url}topics`, newTopic);
  return response.data;
};
