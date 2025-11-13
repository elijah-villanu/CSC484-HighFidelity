export default function ConversationBubble(props) {
  return props.incoming ? (
    <div className="flex items-start gap-[1rem] pr-[5rem]">
      <div className="h-10 w-10 rounded-full bg-custom-light-gray flex items-center justify-center text-[0.875rem] font-semibold text-custom-dark-gray">
        {props.sender
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="flex-grow bg-custom-light-gray p-[0.75rem] rounded-2xl">
        <p>{props.message}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-start gap-[1rem] pl-[5rem]">
      <div className="flex-grow bg-custom-light-blue p-[0.75rem] rounded-2xl">
        <p>{props.message}</p>
      </div>
    </div>
  );
}
