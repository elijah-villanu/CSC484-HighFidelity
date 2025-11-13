import { useNavigate } from "react-router";
import { ArrowLeft as BackIcon, Tag as TagIcon } from "lucide-react";
import Tag from "./components/Tag";
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

export default function CreateEvent(props) {
  const [tags, setTags] = useState(initTags);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title: event.currentTarget.elements.title.value,
      date: event.currentTarget.elements.from.value,
      time: event.currentTarget.elements.to.value,
      location: event.currentTarget.elements.location.value,
      attendees: "",
    };
    props.create(newEvent);
  };

  // Set on flag when clicked
  const handleTag = (key) => {
    setTags(
      tags.map((tag) => (tag.key === key ? { ...tag, on: !tag.on } : tag))
    );
  };

  const navigate = useNavigate();
  return (
    <main className="flex flex-col gap-[1rem]">
      {/* Header */}
      <div className="flex items-center gap-[1rem] px-[1.5rem] border-b border-neutral-300 bg-custom-beige min-h-[5rem]">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="h-5 w-5 text-custom-dark-gray" />
        </button>
        <h1 className="text-[1.25rem] font-semibold">New Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col px-[1.5rem] gap-[2rem]">
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

        {/* Calendar inputs, temporarily text entry */}
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
        <button className="py-[0.25rem] px-[0.5rem] -mt-[1rem] bg-custom-blue w-max rounded-md">
          Add Day
        </button>

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
          <button className="w-full rounded-2xl p-3 text-center  font-semibold shadow transition active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-custom-dark-blue text-white focus:ring-custom-dark-blue" type="submit">
            Create Event
          </button>
        </div>
      </form>
    </main>
  );
}
