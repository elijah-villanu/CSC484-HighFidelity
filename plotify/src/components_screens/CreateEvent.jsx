import { useNavigate } from "react-router";
import {
  ArrowLeft as BackIcon,
  Tag as TagIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
} from "lucide-react";
import Tag from "./components/Tag";
import Calendar from "./components/Calendar";
import { useState } from "react";

// Temporary tag description data structure
const initTags = [
  {
    key: 1,
    name: "Casual",
    on: true,
  },
  {
    key: 2,
    name: "High Energy",
    on: false,
  },
  {
    key: 3,
    name: "Entertainment",
    on: false,
  },
  {
    key: 4,
    name: "Food",
    on: false,
  },
  {
    key: 5,
    name: "Outdoor",
    on: false,
  },
];

// Converts the to and from inputs to the set time
function convertTime(from, to) {
  return `${from} - ${to}`;
}

// Convert to Month. Date format
function convertDate(unformattedDate) {
  const elements = unformattedDate.toString().split(" ");
  const month = elements[1];
  const day = elements[2];

  return `${month}. ${day}`;
}

export default function CreateEvent(props) {
  const [tags, setTags] = useState(initTags);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState();
  // const [allDay, setAllDay] = useState(false);

  const handleSubmit = (event) => {
    const fromTime = event.currentTarget.elements.from.value;
    const toTime = event.currentTarget.elements.to.value;

    event.preventDefault();
    const newEvent = {
      title: event.currentTarget.elements.title.value,
      date: convertDate(date),
      time: convertTime(fromTime, toTime),
      location: event.currentTarget.elements.location.value,
      attendees: "0/5",
      host: "John Doe",
      capacity: 5,
      description: event.currentTarget.elements.description.value,
      going: [],
    };
    props.create(newEvent);
    // Once event is created, go back to events page and set flag event is created
    navigate("/events", {
      state: { created: true },
    });
  };

  const handleCalendarClick = () => {
    setCalendarOpen(!calendarOpen);
  };

  // Set on flag when clicked
  const handleTag = (key) => {
    setTags(
      tags.map((tag) => (tag.key === key ? { ...tag, on: !tag.on } : tag))
    );
  };

  const navigate = useNavigate();
  return (
    <main className="flex flex-col gap-[0.75rem]">
      {/* Header */}
      <div className="flex items-center gap-[1rem] px-[1.5rem] border-b border-neutral-300 bg-custom-beige min-h-[5rem]">
        <button
          onClick={() =>
            navigate("/events", {
              state: { created: false },
            })
          }
        >
          <BackIcon className="h-5 w-5 text-custom-dark-gray" />
        </button>
        <h1 className="text-[1.25rem] font-semibold">New Event</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-[1.5rem] gap-[2rem]"
      >
        {/* Name and locations fields */}
        <div>
          <h2>Name</h2>
          <input
            type="text"
            id="title"
            className="pt-1 pb-1 border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
          ></input>
        </div>
        <div>
          <h2>Location</h2>
          <input
            type="text"
            id="location"
            className="pt-1 pb-1 border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
          ></input>
        </div>

        {/* Calendar inputs using React Day Picker */}
        <div>
          <h2>Date</h2>
          <button
            type="button"
            onClick={handleCalendarClick}
            className="mt-[0.8rem] pt-[0.3rem] pb-[0.3rem] pl-[1rem] outline-1 rounded-sm outline-custom-dark-gray w-full"
          >
            <div className="flex flex-row gap-[1rem]">
              <CalendarIcon />
              {date && <h2>{convertDate(date)}</h2>}
            </div>
          </button>
          {calendarOpen && (
            <div className="relative">
              <div className="p-[1rem] rounded-md absolute top-1 left-0 bg-custom-beige">
                <Calendar selected={date} onSelect={setDate} />
                <button
                  className="rounded-2xl p-3 text-center font-semibold shadow transition active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-custom-dark-blue text-white focus:ring-custom-dark-blue"
                  type="button"
                  onClick={handleCalendarClick}
                >
                  Pick Day
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Time Inputs */}
        <div className="flex flex-row justify-between gap-1">
          <div>
            <h2>From</h2>
            <input
              type="text"
              id="from"
              className="pt-1 pb-1 border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
            ></input>
          </div>
          <div>
            <h2>To</h2>
            <input
              type="text"
              id="to"
              className="pt-[0.25rem] pb-[0.25rem] border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
            ></input>
          </div>
        </div>

        {/* All day toggle */}
        <div className="flex flex-row gap-[0.75rem]">
          <div className="flex flex-row gap-[0.5rem]">
            <ClockIcon />
            <h2>All Day</h2>
          </div>
          <input type="checkbox"></input>
        </div>

        {/* Description field */}
        <div>
          <h2 className="mb-[0.5rem]">Description</h2>
          <textarea
            rows="3"
            id="description"
            className="outline-1 outline-custom-dark-gray w-full p-[0.5rem] rounded-md focus:outline-black"
          ></textarea>
        </div>

        {/* Tags field */}
        <div>
          <div className="mb-[0.5rem] flex flex-row items-center gap-[0.5rem]">
            <TagIcon className="h-6 text-custom-dark-gray" />
            <h2>Tags</h2>
          </div>
          <div className="flex flex-wrap gap-[0.75rem]">
            {tags.map((tag) => (
              <Tag
                tagKey={tag.key}
                click={handleTag}
                name={tag.name}
                tagOn={tag.on}
              />
            ))}
          </div>
        </div>

        {/* Create event button */}
        <div className="p-[1rem] px-[1.5rem]">
          <button
            className="w-full rounded-2xl p-3 text-center font-semibold shadow transition active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-custom-dark-blue text-white focus:ring-custom-dark-blue"
            type="submit"
          >
            Create Event
          </button>
        </div>
      </form>
    </main>
  );
}
