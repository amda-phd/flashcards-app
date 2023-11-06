import React from "react";
import Modal from "react-modal";

import useCreateTopic from "../hooks/useCreateTopic";

import "../styles/CreateTopicModal.css";

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { name, setName, level, setLevel, mutation, handleCreateClick } =
    useCreateTopic(onClose);

  return (
    <Modal
      className="CreateTopicModal"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Topic Modal"
      ariaHideApp={false} // Disable ariaHideApp to prevent screen reader from seeing the content in the background
    >
      <h2>Create Topic</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={3}
          maxLength={120}
          required
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="medium">Medium</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <button onClick={handleCreateClick}>Create</button>
      <button onClick={onClose}>Cancel</button>
      {mutation.isLoading && <div>Loading...</div>}
    </Modal>
  );
};

export default CreateTopicModal;
