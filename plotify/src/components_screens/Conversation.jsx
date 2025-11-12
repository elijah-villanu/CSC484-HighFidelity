import ConversationBubble from "./components/ConversationBubble";
import { Send, Send as SendMessageIcon} from "lucide-react"

export default function Conversation() {
  return (
    <main className="overflow-scroll flex flex-col gap-[1rem]">
      <div className="flex items-center gap-[1rem] p-[1rem] bg-custom-beige">
        <div className="size-[3rem] overflow-hidden flex items-center justify-center rounded-full">
          <img
            className="w-full"
            alt="John Doe"
            src="https://images.pexels.com/photos/8638714/pexels-photo-8638714.jpeg"
          />
        </div>
        <p className="font-bold text-[1.125rem]">John Doe</p>
      </div>

      <div className="px-[1rem] flex flex-col justify-end flex-grow gap-[1.75rem]">
        <ConversationBubble
          message="Hi, could I hitch a ride with you to the movie night?"
          incoming={false}
        />
        <ConversationBubble
          sender="John Doe"
          message="Oh, yeah for sure."
          incoming={true}
        />
        <ConversationBubble
          sender="John Doe"
          message="Awesome!"
          incoming={false}
        />
      </div>

      <div className="flex gap-[1rem] items-center p-[1rem]">
        <input
          placeholder="Message"
          className="bg-custom-gray rounded-3xl px-[0.75rem] py-[0.5rem] flex-grow"
        />
        <div className="bg-custom-gray rounded-full h-full w-auto aspect-square flex items-center justify-center p-[0.125rem]">
        <SendMessageIcon className="text-custom-blue"/></div>
      </div>
    </main>
  );
}
