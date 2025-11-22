import { useNavigate } from "react-router";
import {
  ArrowLeft as BackIcon,
  Tag as TagIcon,
  Calendar as CalendarIcon,
  PersonStanding as PersonIcon,
} from "lucide-react";
import Tag from "./components/Tag";
import Calendar from "./components/Calendar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// Tag description data structure
const initTags = [
  {
    key: 1,
    name: "Casual",
    on: false,
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
// time inputs are 24 hours scale, convert to 12 AM/PM
function convertTime(from, to) {
  const [fromHourStr, fromMin] = from.split(":");
  let fromHour = parseInt(fromHourStr);
  const fromAmPm = fromHour >= 12 ? "pm" : "am";
  const convertedFrom = `${fromHour}:${fromMin}${fromAmPm}`;

  const [toHourStr, toMin] = to.split(":");
  let toHour = parseInt(toHourStr);
  const toAmPm = toHour >= 12 ? "pm" : "am";
  const convertedTo = `${toHour}:${toMin}${toAmPm}`;

  return `${convertedFrom} - ${convertedTo}`;
}

// Convert to Month. Date format
function convertDate(unformattedDate) {
  const elements = unformattedDate.toString().split(" ");
  const month = elements[1];
  const day = elements[2];

  return `${month}. ${day}`;
}

export default function EditEvent(props) {
  // grab id to edit
  const { eventId } = useParams();
  const existingEvent = props.eventList.find((e) => e.id === parseInt(eventId));

  const [formData, setFormData] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState();
  const [dayError, setDayError] = useState(false);

  // if editing, load existing form data (using unformatted data)
  useEffect(() => {
    if (existingEvent) {
      setFormData({
        title: existingEvent.title || "",
        location: existingEvent.location || "",
        description: existingEvent.description || "",
        tags: existingEvent.tags || [],
        unformattedDate: existingEvent.unformattedDate || "",
        unformattedFrom: existingEvent.unformattedFrom || "",
        unformattedTo: existingEvent.unformattedTo || "",
        capacity: existingEvent.capacity || "",
      });
      setDate(existingEvent.unformattedDate);
    }
  }, [existingEvent]);

  // if editing, load those tags, if not use generic initTags (all off)
  const [tags, setTags] = useState(
    existingEvent
      ? initTags.map((t) => ({ ...t, on: existingEvent.tags.includes(t.name) }))
      : initTags
  );

  const [errors, setErrors] = useState({
    title: "",
    location: "",
    from: "",
    to: "",
    capacity: "",
  });
  // Allows input validation to happen only after user clicks away from input
  const [touched, setTouched] = useState({
    title: true,
    location: true,
    from: true,
    to: true,
    capacity: true,
  });
  const [canSubmit, setCanSubmit] = useState(false);

  // Can only submit if form input is valid
  const handleSubmit = (event) => {
    event.preventDefault();
    const fromTime = formData.unformattedFrom;
    const toTime = formData.unformattedTo;
    const capacity = formData.capacity;
    // first input all existing data then add edits (tracked by form data for initial form data load)
    const updatedEvent = {
      ...existingEvent,
      title: formData.title,
      date: convertDate(date),
      unformattedDate: date,
      time: convertTime(fromTime, toTime),
      unformattedFrom: fromTime,
      unformattedTo: toTime,
      location: formData.location,
      attendees: `1/${capacity}`,
      host: "John D.",
      capacity: capacity,
      description: formData.description,
      tags: tags.filter((t) => t.on).map((t) => t.name),
      editor: true,
    };

    props.update(updatedEvent);
    // Once event is edited, go back to specific page
    navigate(-1);
  };

  // Check all required inputs for no errors then makes button available
  useEffect(() => {
    const hasNoErrors = Object.values(errors).every((error) => error === "");
    const beenTouched = Object.values(touched).every((field) => field === true);
    if (hasNoErrors && beenTouched) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [errors, touched]);

  const validateDate = () => {
    if (!date) {
      setDayError(true);
    } else {
      setDayError(false);
    }
  };

  const handleCalendarClick = () => {
    setCalendarOpen(!calendarOpen);
    validateDate();
  };

  // generic handle input change applied to all required form inputs
  const validateInput = (field, input) => {
    if (input.trim() === "") {
      setErrors((prev) => ({ ...prev, [field]: "error" }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Set on flag when clicked
  const handleTag = (key) => {
    setTags(
      tags.map((tag) => (tag.key === key ? { ...tag, on: !tag.on } : tag))
    );
  };

  const navigate = useNavigate();
  // Wait for current event state to be loaded in before rendering
  if (!formData) return <div></div>;
  return (
    <main className="flex flex-col gap-[0.75rem]">
      {/* Header */}
      <div className="flex items-center gap-[1rem] px-[1.5rem] border-b border-neutral-300 bg-custom-beige min-h-[5rem]">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="h-5 w-5 text-custom-dark-gray" />
        </button>
        <h1 className="text-[1.25rem] font-semibold">Edit Event</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-[1.5rem] gap-[2rem]"
      >
        {/* Name and locations fields */}
        <div>
          <h2>
            Event Name
            {errors.title && (
              <span className="text-red-500">
                <b> *Please Add an Event Name </b>
              </span>
            )}
          </h2>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => {
              if (touched.title) validateInput("title", e.currentTarget.value);
              setFormData((prev) => ({ ...prev, title: e.target.value }));
            }}
            onBlur={(e) => {
              setTouched((prev) => ({ ...prev, title: true }));
              validateInput("title", e.currentTarget.value);
            }}
            className="pt-1 pb-1 border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
          ></input>
        </div>
        <div>
          <h2>
            Location
            {errors.location && touched.location && (
              <span className="text-red-500">
                <b> *Please Add an Location </b>
              </span>
            )}
          </h2>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => {
              if (touched.location)
                validateInput("location", e.currentTarget.value);
              setFormData((prev) => ({ ...prev, location: e.target.value }));
            }}
            onBlur={(e) => {
              setTouched((prev) => ({ ...prev, location: true }));
              validateInput("location", e.currentTarget.value);
            }}
            className="pt-1 pb-1 border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
          ></input>
        </div>

        {/* Calendar inputs using React Day Picker */}
        <div>
          <h2>
            Date
            {dayError && (
              <span className="text-red-500">
                <b> *Please Choose a Date </b>
              </span>
            )}
          </h2>
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
        <div className="flex flex-row justify-between gap-[2rem]">
          <div className="w-full">
            <h2>
              From
              {errors.from && touched.from && (
                <span className="text-red-500">
                  <b> *Please Add a Time </b>
                </span>
              )}
            </h2>
            <input
              type="time"
              id="from"
              value={formData.unformattedFrom}
              onChange={(e) => {
                if (touched.from) validateInput("from", e.currentTarget.value);
                setFormData((prev) => ({
                  ...prev,
                  unformattedFrom: e.target.value,
                }));
              }}
              onBlur={(e) => {
                setTouched((prev) => ({ ...prev, from: true }));
                validateInput("from", e.currentTarget.value);
              }}
              className="pt-1 pb-1 border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
            ></input>
          </div>
          <div className="w-full">
            <h2>
              To
              {errors.to && touched.to && (
                <span className="text-red-500">
                  <b> *Please Add a Time </b>
                </span>
              )}
            </h2>
            <input
              type="time"
              id="to"
              value={formData.unformattedTo}
              onChange={(e) => {
                if (touched.to) validateInput("to", e.currentTarget.value);
                setFormData((prev) => ({
                  ...prev,
                  unformattedTo: e.target.value,
                }));
              }}
              onBlur={(e) => {
                setTouched((prev) => ({ ...prev, to: true }));
                validateInput("to", e.currentTarget.value);
              }}
              className="pt-[0.25rem] pb-[0.25rem] border-b-2 border-custom-dark-gray w-full outline-none focus:border-b-2 focus:border-black"
            ></input>
          </div>
        </div>

        {/* Capacity field */}
        <div>
          <div className="flex flex-row items-center mt-[0.5rem]">
            <PersonIcon className="h-[1.1rem]" />
            <h2>
              Capacity
              {errors.capacity && touched.capacity && (
                <span className="text-red-500">
                  <b> *Please Add a Capacity </b>
                </span>
              )}
            </h2>
          </div>
          <div className="flex flex-row justify-between gap-[2rem]">
            <input
              type="number"
              step="1"
              id="capacity"
              value={formData.capacity}
              onChange={(e) => {
                if (touched.capacity)
                  validateInput("capacity", e.currentTarget.value);
                setFormData((prev) => ({ ...prev, capacity: e.target.value }));
              }}
              onBlur={(e) => {
                setTouched((prev) => ({ ...prev, capacity: true }));
                validateInput("capacity", e.currentTarget.value);
              }}
              className="mt-[0.8rem] pt-[0.3rem] pb-[0.3rem] pl-[1rem] outline-1 rounded-sm outline-custom-dark-gray w-full"
            ></input>
            <div className="w-full"></div>
          </div>
        </div>

        {/* Description field */}
        <div>
          <h2 className="mb-[0.5rem]">Description</h2>
          <textarea
            rows="3"
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
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

        {/* Edit event button */}
        <div className="p-[1rem] px-[1.5rem]">
          {canSubmit ? (
            <button
              className="w-full rounded-2xl p-3 text-center font-semibold shadow transition active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-offset-2 bg-custom-dark-blue text-white focus:ring-custom-dark-blue"
              type="submit"
            >
              Edit Event
            </button>
          ) : (
            <button
              className="w-full rounded-2xl p-3 text-center font-semibold shadow bg-custom-gray text-black"
              type="submit"
              disabled={true}
            >
              Edit Event
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
