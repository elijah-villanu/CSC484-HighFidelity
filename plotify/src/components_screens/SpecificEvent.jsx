import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft as BackIcon,
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

export default function SpecificEvent({ events = [] }) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { state } = useLocation();

  // Prefer events passed from App; fallback to navigation state if present.
  const allEvents = useMemo(() => {
    if (events && events.length) return events;
    if (state?.event) return [state.event];
    return [];
  }, [events, state]);

  const event = useMemo(() => {
    const idNum = Number(eventId);
    return allEvents.find((e) => Number(e.id) === idNum);
  }, [allEvents, eventId]);

  const [isRsvped, setIsRsvped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // compute attendee numbers safely
  const goingCount = event?.going?.length || 0;
  let cap = 0;
  if (typeof event?.capacity === "number") {
    cap = event.capacity;
  } else if (event?.attendees) {
    const parts = String(event.attendees).split("/");
    cap = Number(parts[1]) || 0;
  }

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Event not found</p>
          <button
            onClick={navigate("/events", {
                      state: { created: true },
                    })}
            className="mt-3 rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300"
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-scroll flex flex-col gap-[1rem] bg-white text-neutral-900 min-h-screen pb-[6rem]">
      {/* Header */}
      <div className="flex items-center gap-[1rem] h-[5rem] px-[1.5rem] bg-custom-beige border-b border-custom-gray">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="h-5 w-5 text-custom-dark-gray" />
        </button>
        <h1 className="font-bold text-[1.25rem]">Event Details</h1>
      </div>

      {/* Event content */}
      <div className="px-[1.5rem] pb-[1rem]">
        <div className="bg-white rounded-xl shadow-md border border-custom-light-gray">
          <div className="p-[1rem]">
            <h2 className="text-xl font-semibold">{event.title}</h2>

            <ul className="mt-3 space-y-2 text-sm pb-[1rem]">
              <li className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-custom-dark-gray" />
                <span>{event.date}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-custom-dark-gray" />
                <span>{event.time}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-custom-dark-gray" />
                <span>{event.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <UserRound className="h-4 w-4 text-custom-dark-gray" />
                <span>Hosted by {event.host ?? "TBD"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Users className="h-4 w-4 text-custom-dark-gray" />
                <span>
                {cap ? `${goingCount}/${cap}` : event.attendees || "0/0"}
                </span>
              </li>
            </ul>

            {/* Description with read more/less */}
            <div className="border-y border-custom-light-gray py-[1rem]">
              <p className="text-[0.875rem] text-black">
                <span className="font-semibold">Description: </span>
                {event.description
                  ? expanded
                    ? event.description
                    : `${event.description.slice(0, 120)}${
                        event.description.length > 120 ? "..." : ""
                      }`
                  : "No description yet."}
              </p>
              {event.description && event.description.length > 120 && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-custom-green"
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
              )}
            </div>

            {/* Who's going */}
            <div className="pt-[1rem]">
              <div className="text-sm font-semibold text-custom-black mb-2">
                Who’s going?
              </div>

              {event.going && event.going.length > 0 ? (
                <ul className="space-y-2">
                  {event.going.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-center justify-between rounded-2xl border border-custom-gray px-[0.75rem] py-[0.5rem]"
                    >
                      <div className="flex items-center gap-[0.5rem]">
                        <div className="h-6 w-6 rounded-full bg-custom-light-gray flex items-center justify-center text-[0.7rem] font-semibold text-custom-dark-gray">
                          {p.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <p className="flex items-center text-[0.875rem] text-black gap-[0.5rem]">
                          {p.name}
                          {p.isHost ? (
                            <span className="text-[0.75rem] text-custom-dark-gray">(host)</span>
                          ) : null}
                        </p>
                      </div>

                      <div className="flex items-center gap-[0.5rem] text-custom-dark-gray">
                        {p.carSeats && (
                          <div className="flex items-center gap-1 text-sm">
                            <Car className="h-4 w-4" />
                            <span>
                              {p.carSeats.taken}/{p.carSeats.total}
                            </span>
                          </div>
                        )}
                        <Link to = {"/conversation"}>
                            <button>
                                <MessageSquare className="h-4 w-4" />
                            </button>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-custom-dark-gray">No attendees yet.</div>
              )}
            </div>

            {/* RSVP button */}
            <div className="p-[1rem] px-[1.5rem]">
              <button
                onClick={() => setIsRsvped((v) => !v)}
                className={`w-full rounded-2xl p-3 text-center  font-semibold shadow transition active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isRsvped
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600"
                    : "bg-custom-dark-blue text-white focus:ring-custom-dark-blue"
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
