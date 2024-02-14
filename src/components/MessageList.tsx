import { format } from "date-fns";
import { useConversationContext } from "../context/conversationsContext";
import { Message } from "../types";
import sortData from "../utils/sortData";
import "./MessageList.css";

const MessageList: React.FC = () => {
  const { selectedConversation } = useConversationContext();

  if (!selectedConversation) {
    return <div>No conversation selected</div>;
  }

  const orderedMsgs = sortData(selectedConversation.messages, "last_updated");

  return (
    <div>
      <ul>
        {orderedMsgs.map((message: Message) => (
          <li key={message.id}>
            <p className="message-date">
              {format(message.last_updated, "EEEE, dd MMM HH:mm:ss")}
            </p>
            <p className="message-text">{message.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
