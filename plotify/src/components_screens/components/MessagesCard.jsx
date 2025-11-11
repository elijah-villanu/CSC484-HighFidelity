import { Link } from "react-router";

export default function MessagesCard(props) {
  return (
    <Link to="/conversation" className="flex items-center gap-[1rem] border-b-1 border-b-solid border-b-custom-gray p-[1rem]">
      <div className="h-6 w-6 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-700">
        {props.sender
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="flex-grow">
        <h2>{props.sender}</h2>
        <p>{props.messagePeek}</p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p>{props.lastTimestamp}</p>
        <p className="flex items-center justify-center p-[0.5rem] rounded-full bg-custom-beige w-[1.75rem] h-[1.75rem]">{props.unreadCount}</p>
      </div>
    </Link>
  );
}
