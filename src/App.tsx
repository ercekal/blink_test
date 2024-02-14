import {
  ConversationProvider,
  useConversationContext,
} from "./context/conversationsContext";
import Conversations from "./components/Conversations";
import MessageList from "./components/MessageList";
import ReplySection from "./components/ReplySection";
import "./App.css";

function App() {
  const { conversations } = useConversationContext();
  console.log("conversations: ", conversations);

  return (
    <div className="App">
      <Conversations />
      <div>
        <MessageList />
        <ReplySection />
      </div>
    </div>
  );
}

const AppWithProvider: React.FC = () => {
  return (
    <ConversationProvider>
      <App />
    </ConversationProvider>
  );
};

export default AppWithProvider;
