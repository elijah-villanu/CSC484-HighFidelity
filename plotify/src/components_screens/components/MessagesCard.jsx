export default function MessagesCard(props) {
  return (
    <div className="flex items-center gap-[1rem]">
      <div className="h-6 w-6 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-700">
        {props.sender
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div>
        <h2>{props.sender}</h2>
        <p>{props.messagePeek}</p>
      </div>
      <div>
        <p>{props.lastTimestamp}</p>
        <p>{props.unreadCount}</p>
      </div>
    </div>
  );
}
