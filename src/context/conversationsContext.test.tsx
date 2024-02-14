import { render } from "@testing-library/react";
import {
  ConversationProvider,
  useConversationContext,
} from "./conversationsContext";
import { JSX } from "react/jsx-runtime";

const mockData = [
  {
    id: "1",
    name: "Conversation 1",
    last_updated: "2022-01-01T12:00:00",
    messages: [
      {
        id: "1",
        text: "Hello!",
        last_updated: "2022-01-01T12:05:00",
      },
      {
        id: "2",
        text: "How are you?",
        last_updated: "2022-01-01T12:10:00",
      },
    ],
  },
  {
    id: "2",
    name: "Conversation 2",
    last_updated: "2022-01-02T09:30:00",
    messages: [
      {
        id: "3",
        text: "Hi there!",
        last_updated: "2022-01-02T09:35:00",
      },
      {
        id: "4",
        text: "All good",
        last_updated: "2022-01-02T09:40:00",
      },
    ],
  },
];

describe("ConversationProvider", () => {
  test("provides context values", () => {
    const { getByTestId } = renderWithContext(<MockComponent />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const contextElement = getByTestId("mock-component");
    const contextValue = JSON.parse(contextElement.textContent || "");

    expect(contextValue.conversations).toEqual(mockData);
  });
});

const MockComponent = () => {
  const context = useConversationContext();
  return <div data-testid="mock-component">{JSON.stringify(context)}</div>;
};

const renderWithContext = (component: JSX.Element) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ConversationProvider testData={mockData}>{children}</ConversationProvider>
  );
  return render(component, { wrapper });
};
