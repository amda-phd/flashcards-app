import React from "react";
import { useDispatch } from "react-redux";

import { setSelectedTopic } from "../../redux/slices/topicSlice";
import useFetchTopics from "../../hooks/useFetchTopics";
import { TopicItem } from "../../interfaces/Topic";

import "../../styles/TopicsList.css";

const TopicsList: React.FC = () => {
  const topics = useFetchTopics();
  const dispatch = useDispatch();

  const handleItemClick = async (topic: TopicItem) => {
    dispatch(setSelectedTopic(topic));
  };

  return (
    <div className="topics-list-container">
      <h2 className="topics-list-title">My topics</h2>
      {topics?.map((topic) => (
        <div
          key={topic._id}
          onClick={() => handleItemClick(topic)}
          className={`topic-item ${topic.level}`}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default TopicsList;
