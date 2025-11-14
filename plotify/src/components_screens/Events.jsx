import { Link, useLocation } from "react-router";
import React, {useState, useEffect} from 'react';
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
            className="flex-grow"
          />
          <X className="text-custom-dark-gray h-6 w-6">✖</X>
        </div>

        {/* Funnel Icon */}
        <button className="ml-3">
          <Funnel className="h-6 w-6 text-custom-dark-gray" />
        </button>
      </div>

      {/* Event Cards */}
      <div className="space-y-[1rem] px-[1.5rem]">
        {props.events.map((event) => (
          <EventCard
            linkTo={`/events/${event.id}`}
            id={event.id}
            eventTitle={event.title}
            eventDate={event.date}
            eventTime={event.time}
            eventLocation={event.location}
            eventCapacity={event.attendees}
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
