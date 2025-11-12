import { Plus, Check } from "lucide-react";

export default function Tag(props) {
  return (
    <button className="cursor-pointer" onClick={() => props.click(props.tagKey)}>
      {props.tagOn ? (
        <div className="flex bg-custom-gray p-1 rounded-sm hover:bg-gray-300">
          {props.name}
          <Plus />
        </div>
      ) : (
        <div className="flex bg-custom-light-blue p-1 rounded-sm hover:bg-custom-blue">
          {props.name}
          <Check />
        </div>
      )}
    </button>
  );
}
