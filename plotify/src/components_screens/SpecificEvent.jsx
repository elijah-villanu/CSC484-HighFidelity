import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  UserRound,
  Users,
  Car,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [isRsvped, setIsRsvped] = useState(false);

  const event = {
    id: eventId,
    title: "Chill Dinner",
    dateLabel: "Nov. 10",
    timeLabel: "6:00pm – 8:00pm",
    location: "In-n-Out",
    host: "Jane L.",
    capacity: 5,
    going: [
      { name: "Bob R.", carSeats: { taken: 1, total: 4 } },
      { name: "Jane L.", isHost: true },
    ],
    description:
      "Come join us at In-n-Out for some burgers and good vibes. Bring your friends and maybe a beer or two. We’ll grab a big table and hang out!",
  };

  const goingCount = event.going.length;

  return (
    // Make page background white and adjust padding so nav doesn't overlap content
    <main className="overflow-scroll flex flex-col gap-[1rem] bg-white text-neutral-900 min-h-screen pb-[6rem]">
      {/* Header */}
      <div className="flex items-center gap-[0.75rem] p-[1rem] border-b border-neutral-300">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-neutral-200 transition"
        >
          <ArrowLeft className="h-5 w-5 text-neutral-800" />
        </button>
        <h1 className="text-lg font-semibold text-neutral-800">Event Details</h1>
      </div>

      {/* Event content */}
      <div className="px-[1rem] pb-[1rem]">
        <div className="bg-white text-neutral-900 rounded-xl shadow-lg border border-neutral-200">
          <div className="p-[1rem]">
            <h2 className="text-xl font-semibold">{event.title}</h2>

            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-neutral-600" />
                <span>{event.dateLabel}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-neutral-600" />
                <span>{event.timeLabel}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-neutral-600" />
                <span>{event.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <UserRound className="h-4 w-4 text-neutral-600" />
                <span>Hosted by {event.host}</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="h-4 w-4 text-neutral-600" />
                <span>
                  {goingCount}/{event.capacity}
                </span>
              </li>
            </ul>

            <div className="my-4 h-px bg-neutral-200" />

            {/* Description */}
            <div>
              <p className="text-sm leading-6 text-neutral-700">
                <span className="font-semibold">Description: </span>
                {expanded
                  ? event.description
                  : `${event.description.slice(0, 100)}...`}
              </p>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-900"
              >
                {expanded ? (
                  <>
                    read less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    read more <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            <div className="my-4 h-px bg-neutral-200" />

            {/* Who’s going */}
            <div>
              <div className="text-sm font-semibold text-neutral-900 mb-2">
                Who’s going?
              </div>
              <ul className="space-y-2">
                {event.going.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-semibold text-neutral-700">
                        {p.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <span className="text-sm text-neutral-900">{p.name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-neutral-700">
                      {p.carSeats && (
                        <div className="flex items-center gap-1 text-sm">
                          <Car className="h-4 w-4" />
                          <span>
                            {p.carSeats.taken}/{p.carSeats.total}
                          </span>
                        </div>
                      )}
                      <button className="rounded-lg p-1 hover:bg-neutral-200">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RSVP button */}
            <div className="p-[1rem] pt-4">
              <button
                onClick={() => setIsRsvped((v) => !v)}
                className={`w-full rounded-xl px-4 py-3 text-center text-base font-semibold shadow transition active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isRsvped
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600"
                    : "bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500"
                }`}
              >
                {isRsvped ? "RSVP’d" : "RSVP"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
