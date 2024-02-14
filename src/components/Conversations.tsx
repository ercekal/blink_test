import { useConversationContext } from "../context/conversationsContext";
import { Conversation } from "../types";
import "./Conversations.css";

const Conversations = () => {
  const { conversations, selectConversation } = useConversationContext();

  return (
    <div>
      <ul>
        {conversations?.map((c: Conversation) => (
          <li key={c.id} onClick={() => selectConversation(c.id)}>
            <h1>{c.name}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;
