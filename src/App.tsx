import { ConversationProvider } from "./context/conversationsContext";
import Conversations from "./components/Conversations";
import MessageList from "./components/MessageList";
import ReplySection from "./components/ReplySection";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Conversations />
      <div className="right-section">
        <div className="messages">
          <MessageList />
        </div>
        <div className="reply ">
          <ReplySection />
        </div>
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
