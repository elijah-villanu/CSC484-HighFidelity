import { Link } from "react-router";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users, 
  Search,
  Funnel
} from "lucide-react";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Chill Dinner",
      date: "Nov. 10",
      time: "6:00pm - 8:00pm",
      location: "In-n-Out",
      attendees: "2/5"
    },
    {
      id: 2,
      title: "Pitch Perfect Movie Night",
      date: "Nov. 14",
      time: "7:00pm - 9:00pm",
      location: "1234 Coast Drive, San Luis Obispo, CA",
      attendees: "8/15"
    },
    {
      id: 3,
      title: "Yoga Session",
      date: "Nov. 15",
      time: "6:00pm - 8:00pm",
      location: "Performing Arts Center",
      attendees: "1/5"
    },
    {
      id: 4,
      title: "Food Festival",
      date: "Nov. 17",
      time: "7:00pm - 9:00pm",
      location: "Downtown",
      attendees: "15/25"
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
        {events.map(event => (
          <Link
            to={`/events/${event.id}`}
            key={event.id}
            className="block border rounded-2xl p-4 shadow-sm bg-white"
          >
            <h2 className="font-semibold text-lg mb-1">{event.title}</h2>

            <div className="text-gray-700 text-sm space-y-1">
              <div className="flex items-center space-x-2">
                <CalendarIcon className = "h-4 w-4 text-neutral-600" />
                <span>{event.date}</span>
                <Clock className = "h-4 w-4 text-neutral-600" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className = "h-4 w-4 text-neutral-600" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className = "h-4 w-4 text-neutral-600" />
                <span>{event.attendees}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating + Button */}
      <button className="w-16 h-16 bg-blue-400 text-white text-4xl rounded-full fixed bottom-24 right-6 flex items-center justify-center shadow-lg">
        +
      </button>
    </div>
  );
}