import React, { createContext, useContext, useState, ReactNode } from "react";
import { Conversation, Message } from "../types";
import data from "../data/data.json";
import sortData from "../utils/sortData";

interface ConversationContextProps {
  conversations: Conversation[] | null;
  selectedConversation: Conversation | null;
  selectedMessage: Message | null;
  selectConversation: (id: string) => void;
  selectMessage: (id: string) => void;
  handleSendMessage: (text: string) => void;
  handleEditMessage: (text: string) => void;
}

interface ConversationProviderProps {
  children: ReactNode;
  testData?: Conversation[] | null; // added for testing purposes
}

const DataContext = createContext<ConversationContextProps | undefined>(
  undefined
);

export const ConversationProvider: React.FC<ConversationProviderProps> = ({
  children,
  testData,
}) => {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    testData ? testData : sortData(data, "last_updated").reverse()
  );
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const selectConversation = (id: string) => {
    const selectedConversation =
      conversations?.find((c: Conversation) => c.id === id) || null;
    setSelectedConversation(selectedConversation);
  };

  const selectMessage = (id: string) => {
    const selectedMessage =
      selectedConversation?.messages.find((m: Message) => m.id === id) || null;
    setSelectedMessage(selectedMessage);
  };

  const handleSendMessage = (messageText: string) => {
    if (!selectedConversation) return;

    const newMessage = {
      id: `generated-id-${Date.now()}`,
      text: messageText,
      last_updated: new Date().toISOString(),
    };

    const updatedConversations = (conversations || []).map((conv) =>
      conv.id === selectedConversation.id
        ? { ...conv, messages: [...conv.messages, newMessage] }
        : conv
    );

    setConversations(updatedConversations);

    setSelectedConversation((prevSelected) =>
      prevSelected?.id === selectedConversation.id
        ? {
            ...prevSelected,
            messages: [...(prevSelected?.messages || []), newMessage],
          }
        : prevSelected
    );
  };

  const handleEditMessage = (messageText: string) => {
    if (!selectedMessage || !selectedConversation) return;

    const updatedMessages = (selectedConversation.messages || []).map(
      (message) =>
        message.id === selectedMessage.id
          ? {
              ...message,
              text: messageText,
              edited: true,
              last_updated: new Date().toISOString(),
            }
          : message
    );

    const updatedConversations = (conversations || []).map((conv) =>
      conv.id === selectedConversation.id
        ? { ...conv, messages: updatedMessages }
        : conv
    );

    setConversations(updatedConversations);

    setSelectedConversation((prevSelected) =>
      prevSelected?.id === selectedConversation.id
        ? {
            ...prevSelected,
            messages: updatedMessages,
          }
        : prevSelected
    );
  };

  const contextValue: ConversationContextProps = {
    conversations,
    selectedConversation,
    selectedMessage,
    selectMessage,
    selectConversation,
    handleSendMessage,
    handleEditMessage,
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
