import React, { createContext, useContext, useState, ReactNode } from "react";
import { Conversation } from "../types";
import data from "../data/data.json";
import sortData from "../utils/sortData";

interface ConversationContextProps {
  conversations: Conversation[] | null;
  selectedConversation: Conversation | null;
  selectConversation: (id: string) => void;
}

interface ConversationProviderProps {
  children: ReactNode;
}

const DataContext = createContext<ConversationContextProps | undefined>(
  undefined
);

export const ConversationProvider: React.FC<ConversationProviderProps> = ({
  children,
}) => {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    sortData(data, "last_updated").reverse()
  );
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const selectConversation = (id: string) => {
    const selectedConversation =
      conversations?.find((c: Conversation) => c.id === id) || null;
    setSelectedConversation(selectedConversation);
  };

  const contextValue: ConversationContextProps = {
    conversations,
    selectedConversation,
    selectConversation,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useConversationContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useConversationContext must be used within a ConversationProvider"
    );
  }
  return context;
};
