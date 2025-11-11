import { Plus, Check } from "lucide-react";

export default function Tag(props) {
    console.log(props.on)
  return (
    <div>
      {props.tagOn ? (
        <div className="flex bg-custom-gray p-1 rounded-sm">
          {props.name}
          <Plus />
        </div>
      ) : (
        <div className="flex bg-custom-light-blue p-1 rounded-sm">
          {props.name}
          <Check />
        </div>
      )}
    </div>
  );
}
