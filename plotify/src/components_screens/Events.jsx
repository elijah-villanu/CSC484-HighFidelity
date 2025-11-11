import { Link } from "react-router";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Search,
  Funnel,
} from "lucide-react";
import EventCard from "./components/EventCard";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Chill Dinner",
      date: "Nov. 10",
      time: "6:00pm - 8:00pm",
      location: "In-n-Out",
      attendees: "2/5",
    },
    {
      id: 2,
      title: "Pitch Perfect Movie Night",
      date: "Nov. 14",
      time: "7:00pm - 9:00pm",
      location: "1234 Coast Drive, San Luis Obispo, CA",
      attendees: ""
    },
    {
      id: 3,
      title: "Yoga Session",
      date: "Nov. 15",
      time: "6:00pm - 8:00pm",
      location: "Performing Arts Center",
      attendees: "1/5",
    },
    {
      id: 4,
      title: "Food Festival",
      date: "Nov. 17",
      time: "7:00pm - 9:00pm",
      location: "Downtown",
      attendees: ""
    }
  ]
  return (
    <div className="p-4 pb-24 relative">
      {/* Top Tabs */}
      <div className="flex justify-center border-b pb-2 mb-4">
        <button className="font-bold text-xl border-b-2 border-black pb-1 mr-6">
          Browse
        </button>
        <button className="text-xl text-gray-400">My Events</button>
      </div>

      {/* Search Row */}
      <div className="flex items-center mb-4">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 flex-1">
          <Search className="h-8 w-8 text-neutral-600" />
          <input
            placeholder="Search Events"
            className="flex-1 bg-transparent outline-none ml-4"
          />
          <button className="text-gray-400 text-lg mr-1">✖</button>
        </div>

        {/* Funnel Icon */}
        <button className="ml-3">
          <Funnel className="h-8 w-8 text-neutral-700" />
        </button>
      </div>

      {/* Event Cards */}
      <div className="space-y-2">
        {events.map((event) => (
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
      <button className="w-20 h-20 bg-blue-400 text-white text-6xl rounded-full fixed bottom-24 right-136 flex items-center justify-center shadow-lg">
        +
      </button>
    </div>
  );
}
