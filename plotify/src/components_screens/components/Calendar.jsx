import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function Calendar(props) {
  return (
    <div className="mb-[0.5rem] mt-[0.5rem]">
      <DayPicker
        animate
        mode="single"
        selected={props.selected}
        onSelect={props.onSelect}
      />
    </div>
  );
}
