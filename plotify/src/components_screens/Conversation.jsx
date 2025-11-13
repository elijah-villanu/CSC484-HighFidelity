import ConversationBubble from "./components/ConversationBubble";
import { ArrowLeft as BackIcon, Send as SendMessageIcon} from "lucide-react"
import { useNavigate } from "react-router";

export default function Conversation() {

  const navigate = new useNavigate();

  return (
    <main className="overflow-scroll flex flex-col gap-[1rem]">
      {/* header */}
      <div className="flex items-center gap-[1rem] h-[5rem] px-[1.5rem] bg-custom-beige border-b border-custom-gray">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="h-5 w-5 text-custom-dark-gray" />
        </button>
        <h1 className="font-semibold text-[1.25rem]">Bob R.</h1>
      </div>

      <div className="p-[1.5rem] flex flex-col justify-end flex-grow gap-[1.5rem]">
        <ConversationBubble
          message="Hi, could I hitch a ride with you to the movie night?"
          incoming={false}
        />
        <ConversationBubble
          sender="Bob R."
          message="Oh, yeah for sure."
          incoming={true}
        />
        <ConversationBubble
          sender="Bob R."
          message="Awesome!"
          incoming={false}
        />
      </div>
      {/* Type message bar */}
      <div className="flex gap-[1rem] items-center px-[1.5rem] pb-[1.5rem]">
        <input
          placeholder="Message"
          className="bg-custom-light-gray rounded-3xl px-[0.75rem] py-[0.5rem] flex-grow"
        />
        <div className="bg-custom-light-gray rounded-full h-full w-auto aspect-square flex items-center justify-center p-[0.125rem]">
        <SendMessageIcon className="text-custom-dark-blue"/></div>
      </div>
    </main>
  );
}
