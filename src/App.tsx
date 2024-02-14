import logo from "./logo.svg";
import "./App.css";
import {
  ConversationProvider,
  useConversationContext,
} from "./context/conversationsContext";

function App() {
  const { conversations } = useConversationContext();
  console.log("conversations: ", conversations);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        Data test
      </header>
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
