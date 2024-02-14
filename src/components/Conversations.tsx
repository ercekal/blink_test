import { useConversationContext } from "../context/conversationsContext";
import { Conversation } from "../types";

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
}

const Conversations = () => {
  const { conversations, selectConversation } = useConversationContext();

  return (
    <div>
      {conversations?.map((c: Conversation) => (
        <h1 key={c.id} onClick={() => selectConversation(c.id)}>
          {c.name}
        </h1>
      ))}
    </div>
  );
};

export default Conversations;
