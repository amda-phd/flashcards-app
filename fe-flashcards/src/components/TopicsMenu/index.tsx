import React from "react";

import CreateTopicButton from "./CreateTopicButton";
import TopicsList from "./TopicsList";

import "../../styles/TopicsMenu.css";

const TopicsMenu: React.FC = () => {
  return (
    <div className="TopicsMenu">
      <CreateTopicButton />
      <TopicsList />
    </div>
  );
};

export default TopicsMenu;
