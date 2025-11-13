import MessagesCard from "./components/MessagesCard";
import { useLocation } from "react-router";

export default function Messages() {

  return (
    <main className="overflow-scroll flex flex-col gap-[1rem]">
          <h2 className="text-[1.25rem] font-semibold px-[1.5rem] bg-custom-beige h-[5rem] flex items-center border-b border-custom-gray" border-b border-custom-gray>Messages</h2>
      <div className="px-[1.5rem]">
        <MessagesCard
          sender="Bob R."
          messagePeek="Awesome!"
          lastTimestamp="Yesterday"
          unreadCount="0"
        />
        <MessagesCard
          sender="Silas S."
          messagePeek="Do we think we can stop by taco bell after? "
          lastTimestamp="Sunday"
          unreadCount="0"
        />
        <MessagesCard
          sender="John Doe"
          messagePeek="I had so much fun yesterday! Thanks for the ride!"
          lastTimestamp="Saturday"
          unreadCount="1"
        />
      </div>
    </main>
  );
}
