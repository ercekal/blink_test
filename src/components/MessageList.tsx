import React from "react";
import { useConversationContext } from "../context/conversationsContext";
import { Message } from "../types";
import sortData from "../utils/sortData";

const MessageList: React.FC = () => {
  const { selectedConversation } = useConversationContext();

  if (!selectedConversation) {
    return <div>No conversation selected</div>;
  }

  const orderedMsgs = sortData(selectedConversation.messages, "last_updated");

  return (
    <div>
      {orderedMsgs.map((message: Message) => (
        <div key={message.id}>
          <p>{message.text}</p>
          <p>Last Updated: {message.last_updated}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
