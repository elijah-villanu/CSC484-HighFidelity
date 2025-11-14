import { Plus, Check } from "lucide-react";

export default function Tag(props) {
  return (
    <button type="button" className="cursor-pointer" onClick={() => props.click(props.tagKey)}>
      {props.tagOn ? (
        <div className="flex gap-[0.25rem] bg-custom-gray py-[0.5rem] px-[0.75rem] rounded-lg hover:bg-gray-300">
          {props.name}
          <Plus />
        </div>
      ) : (
        <div className="flex gap-[0.25rem] bg-custom-light-blue py-[0.5rem] px-[0.75rem] rounded-lg hover:bg-custom-blue">
          {props.name}
          <Check />
        </div>
      )}
    </button>
  );
}
