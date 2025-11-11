import MessagesCard from "./components/MessagesCard";

export default function Messages() {
  return (
    <main className="overflow-scroll flex flex-col gap-[1rem]">
          <h2 className="text-[1.25rem] font-semibold p-[1rem] bg-custom-beige">Messages</h2>
      <div className="px-[1rem]">
        <MessagesCard
          sender="John Doe"
          messagePeek="Hi this is a message"
          lastTimestamp="Yesterday"
          unreadCount="2"
        />
        <MessagesCard
          sender="John Doe"
          messagePeek="Hi this is a message"
          lastTimestamp="Yesterday"
          unreadCount="2"
        />
        <MessagesCard
          sender="John Doe"
          messagePeek="Hi this is a message"
          lastTimestamp="Yesterday"
          unreadCount="2"
        />
        <MessagesCard
          sender="John Doe"
          messagePeek="Hi this is a message"
          lastTimestamp="Yesterday"
          unreadCount="2"
        />
      </div>
    </main>
  );
}
