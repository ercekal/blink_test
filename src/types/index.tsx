export interface Message {
  id: string;
  text: string;
  last_updated: string;
}

export interface Conversation {
  id: string;
  name: string;
  last_updated: string;
  messages: Message[];
}
