import { Link, useLocation } from "react-router";
import React, {useState, useEffect, useContext} from 'react';
import { RsvpContext } from "../App";
import {
  Calendar as CalendarIcon,
  X,
  Plus,
  MapPin,
  Users,
  Search,
  Funnel,
} from "lucide-react";
import EventCard from "./components/EventCard";

export default function Events(props) {
  const loc = useLocation()
  const [createdFlag, setCreatedFlag] = useState(false)
  const { isRsvped } = useContext(RsvpContext);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const filteredEvents = props.events.filter(event => {
  // Search filter
  const matchesSearch = event.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  // Tag filter
  const matchesTags =
    selectedTags.length === 0 ||
    selectedTags.some(tag => event.tags?.includes(tag));

  return matchesSearch && matchesTags;
});

const allTags = ["Casual", "High Energy", "Entertainment", "Food", "Outdoor"];

const toggleTag = (tag) => {
  setSelectedTags(prev =>
    prev.includes(tag)
      ? prev.filter(t => t !== tag)
      : [...prev, tag]
  );
};

const [tagDropdownOpen, setTagDropdownOpen] = useState(false);

const toggleTagDropdown = () => {
  setTagDropdownOpen(prev => !prev);
};


  useEffect(() => {
    if (loc.state?.created === true){
      setCreatedFlag(true)
    }
    // Only render for three seconds
    const timer = setTimeout(() => {
      setCreatedFlag(false)
    }, 3000)
    // Need to cleanup
    return () => clearTimeout(timer)
  },[loc.state])
  
  return (
    <main className="relative flex flex-col gap-[1rem] items-stretch">
      {createdFlag && (
      <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-center py-3 font-semibold shadow-md z-50">
      Event Created!
      </div>
      )}

      {/* Top Tabs */}
      <div className="flex gap-[1rem] justify-center items-stretch border-b px-[1.5rem] h-[5rem] bg-custom-beige border-b border-custom-gray">
        <button className="font-semibold flex-grow text-[1.25rem] border-b-2 border-custom-dark-gray flex items-center justify-center">
          Browse
        </button>
        <button className="flex-grow text-[1.25rem] text-custom-dark-gray flex items-center justify-center">My Events</button>
      </div>

      {/* Search Row */}
      <div className="flex items-center px-[1.5rem]">
        {/* Search Bar */}
        <div className="flex gap-[1rem] items-center bg-custom-light-gray rounded-full px-[1rem] py-[0.75rem] flex-grow">
          <Search className="h-6 w-6 text-custom-dark-gray" />
          <input
            placeholder="Search Events"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <button onClick={() => setSearchTerm("")}>
          <X className="text-custom-dark-gray h-6 w-6">✖</X>
          </button>
          
        </div>

        {/* Funnel Icon */}
        <div className="ml-3 relative">
  <button onClick={toggleTagDropdown}>
    <Funnel className="h-6 w-6 text-custom-dark-gray" />
  </button>

  {/* tag filtering */}
  {tagDropdownOpen && (
    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50 w-40">
      <h3 className="font-semibold text-sm mb-2">Filter by Tags</h3>

      <div className="flex flex-col gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`text-left px-2 py-1 rounded-md border ${
              selectedTags.includes(tag)
                ? "bg-custom-dark-blue text-white border-custom-dark-blue"
                : "bg-white text-custom-dark-gray border-custom-gray"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )}
</div>

      </div>

      {/* Event Cards */}
      <div className="space-y-[1rem] px-[1.5rem]">
        {filteredEvents.map((event) => (
        <EventCard
    key={event.id}
    linkTo={`/events/${event.id}`}
    id={event.id}
    eventTitle={event.title}
    eventDate={event.date}
    eventTime={event.time}
    eventLocation={event.location}
    eventCapacity={event.attendees}
    isRsvped={isRsvped(event.id)}
    
  />
))}
      </div>

      {/* Floating + Button */}
      <Link to={"/events/create"} className="absolute bottom-[1.75rem] right-[1.75rem]">
        <Plus className="w-15 h-15 bg-custom-dark-blue text-white rounded-full flex items-center justify-center shadow-md p-[0.5rem]">
        </Plus>
      </Link>

    </main>
  );
}
