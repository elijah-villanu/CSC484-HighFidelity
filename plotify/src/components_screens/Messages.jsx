import MessagesCard from "./components/MessagesCard";

export default function Messages() {
  return (
    <MessagesCard
      sender="John Doe"
      messagePeek="Hi this is a message"
      lastTimestamp="Yesterday"
      unreadCount="2"
    />
  );
}
