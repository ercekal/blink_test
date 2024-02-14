import { useState } from "react";
import { useConversationContext } from "../context/conversationsContext";
import "./ReplySection.css";

const ReplySection = () => {
  const [messageText, setMessageText] = useState<string>("");

  const { handleSendMessage } = useConversationContext();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(messageText);
    setMessageText("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="reply-section">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ReplySection;
