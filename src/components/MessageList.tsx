import { format } from "date-fns";
import { useConversationContext } from "../context/conversationsContext";
import { Message } from "../types";
import sortData from "../utils/sortData";
import "./MessageList.css";
import { useRef, useEffect } from "react";

const MessageList: React.FC = () => {
  const { selectedConversation, selectMessage } = useConversationContext();
  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [selectedConversation]);

  if (!selectedConversation) {
    return <div>No conversation selected</div>;
  }

  const orderedMsgs = sortData(selectedConversation.messages, "last_updated");

  return (
    <div>
      <ul>
        {orderedMsgs.map((message: Message, i: number) => (
          <li
            key={message.id}
            ref={
              i === selectedConversation.messages.length - 1
                ? lastMessageRef
                : null
            }
            onClick={() => selectMessage(message.id)}
            className="message"
          >
            <p className="message-date">
              {format(message.last_updated, "EEEE, dd MMM HH:mm:ss")}{" "}
              <i>{message.edited && "Edited"}</i>
            </p>
            <p className="message-text">{message.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
