import React, { createContext, useContext, useState, ReactNode } from "react";
import { Conversation } from "../types";
import data from "../data/data.json";
import sortData from "../utils/sortData";

interface DataContextProps {
  conversations: Conversation[] | null;
}

interface ConversationProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const ConversationProvider: React.FC<ConversationProviderProps> = ({
  children,
}) => {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    sortData(data, "last_updated").reverse()
  );

  return (
    <DataContext.Provider value={{ conversations }}>
      {children}
    </DataContext.Provider>
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
