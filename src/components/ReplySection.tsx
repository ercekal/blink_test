import { useEffect, useState } from "react";
import { useConversationContext } from "../context/conversationsContext";
import "./ReplySection.css";

const ReplySection = () => {
  const [messageText, setMessageText] = useState<string>("");
  const [editableMessage, setEditableMessage] = useState<string | null>(null);

  const { handleSendMessage, handleEditMessage, selectedMessage } =
    useConversationContext();

  useEffect(() => {
    if (selectedMessage) setEditableMessage(selectedMessage?.text);
  }, [selectedMessage]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editableMessage) {
      handleEditMessage(editableMessage);
      setEditableMessage(null);
    } else {
      handleSendMessage(messageText);
      setMessageText("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editableMessage
      ? setEditableMessage(e.target.value)
      : setMessageText(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit} className="reply-section">
      <input
        type="text"
        value={editableMessage || messageText}
        onChange={handleChange}
        placeholder="Type your message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ReplySection;
