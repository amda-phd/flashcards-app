import React, { useState } from "react";
import CreateTopicModal from "../CreateTopicModal";

import "../../styles/TopicsMenu.css";

const CreateTopicButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="CreateTopicButton">
      <button className="button is-primary" onClick={openModal}>
        Create Topic
      </button>
      <CreateTopicModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CreateTopicButton;
