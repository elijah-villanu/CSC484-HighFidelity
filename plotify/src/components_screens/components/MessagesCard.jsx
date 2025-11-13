import { Link } from "react-router";

export default function MessagesCard(props) {
  return (
    <Link to="/conversation" className="flex items-start gap-[1rem] border-b-1 border-b-solid border-b-custom-light-gray py-[1rem] overflow-hidden">
      <div className="min-h-10 min-w-10 rounded-full bg-custom-light-gray flex items-center justify-center text-[0.875rem] font-semibold text-custom-dark-gray">
        {props.sender
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="flex-grow flex flex-col flex-nowrap text-nowrap overflow-hidden">
        <h2 className="font-semibold text-[1.0675rem]">{props.sender}</h2>
        <p>{props.messagePeek}</p>
      </div>
      <div className="flex flex-col items-end justify-between gap-[0.5rem]">
        <p className="text-[0.75rem] text-custom-dark-gray">{props.lastTimestamp}</p>
        {props.unreadCount==0 ? null : 
        <p className="flex items-center justify-center rounded-full bg-custom-light-blue w-[1.5rem] h-[1.5rem] text-[0.75rem] font-semibold">{props.unreadCount}</p>}
      </div>
    </Link>
  );
}
