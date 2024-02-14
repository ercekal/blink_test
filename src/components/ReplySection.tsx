import { useState } from "react";
import { useConversationContext } from "../context/conversationsContext";

const ReplySection = () => {
  const [messageText, setMessageText] = useState<string>("");

  const { handleSendMessage } = useConversationContext();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(messageText);
    setMessageText("");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ReplySection;
