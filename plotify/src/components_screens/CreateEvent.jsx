// import { useState} from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Tag as TagIcon } from "lucide-react";
import Tag from "./components/Tag";

// Temporary tag description data structure
const tags = [
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      title:  event.currentTarget.elements.title.value,
      date:  event.currentTarget.elements.from.value,
      time: event.currentTarget.elements.to.value,
      location:  event.currentTarget.elements.location.value,
      attendees: "",
    };
    props.create(newEvent)
  }

  const navigate = useNavigate();
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-[0.75rem] p-[1rem] border-b border-neutral-300">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-neutral-200 transition"
        >
          <ArrowLeft className="h-5 w-5 text-neutral-800" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-800">New Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col m-6 gap-8">
        {/* Name and locations fields */}
        <div>
          <h1>Name</h1>
          <input
            type="text"
            id="title"
            className="pt-1 pb-1 border-b-2 border-gray-400 w-full outline-none focus:border-b-2 focus:border-black"
          ></input>
        </div>
        <div>
          <h1>Location</h1>
          <input
            type="text"
            id="location"
            className="pt-1 pb-1 border-b-2 border-gray-400 w-full outline-none focus:border-b-2 focus:border-black"
          ></input>
        </div>

        {/* Calendar inputs, temporarily text entry */}
        <div className="flex flex-row justify-between gap-1">
          <div>
            <h2>From</h2>
            <input
              type="text"
              id="from"
              className="pt-1 pb-1 border-b-2 border-gray-400 w-full outline-none focus:border-b-2 focus:border-black"
            ></input>
          </div>
          <div>
            <h2>To</h2>
            <input
              type="text"
              id="to"
              className="pt-1 pb-1 border-b-2 border-gray-400 w-full outline-none focus:border-b-2 focus:border-black"
            ></input>
          </div>
        </div>
        <button className="p-1 -mt-5 bg-custom-gray max-w-20 rounded-sm">
          Add Day
        </button>

        {/* Description field */}
        <div>
          <h2 className="mb-3">Description</h2>
          <textarea
            rows="3"
            id="description"
            className="outline-1 outline-grey w-full p-1"
          ></textarea>
        </div>

        {/* Tags field */}
        <div>
          <div className="mb-2 flex flex-row items-center gap-1">
            <TagIcon className="h-6" />
            <h2>Tags</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag name={tag.name} tagOn={tag.on} />
            ))}
          </div>
        </div>

        {/* Create event button */}
        <div className="flex-col flex bg-custom-light-blue rounded-sm h-9 hover:bg-custom-blue">
          <button className="h-full w-full" type="submit">
            <b>CREATE</b>
          </button>
        </div>
      </form>
    </div>
  );
}
