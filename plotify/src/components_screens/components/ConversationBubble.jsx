export default function ConversationBubble(props) {
  return props.incoming ? (
    <div className="flex items-start gap-[1rem] px-[1rem] pr-[5rem]">
      <div className="h-6 w-6 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-700">
        {props.sender
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
      <div className="flex-grow bg-custom-gray p-[0.75rem] rounded-2xl">
        <p>{props.message}</p>
      </div>
    </div>
  ) : (
    <div className="flex items-start gap-[1rem] px-[1rem] pl-[5rem]">
      <div className="flex-grow bg-custom-light-blue p-[0.75rem] rounded-2xl">
        <p>{props.message}</p>
      </div>
    </div>
  );
}
