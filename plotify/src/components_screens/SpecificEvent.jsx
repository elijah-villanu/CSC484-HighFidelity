import React, { useMemo, useState, useContext } from "react";
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
  Pencil as EditIcon,
  Trash as DeleteIcon,
} from "lucide-react";

// IMPORTANT: App.jsx is one folder up from components_screens
import { RsvpContext } from "../App";

export default function SpecificEvent({ events = [], deleteEvent }) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { state } = useLocation();

  // Global in-memory RSVP (survives navigation, resets on full reload)
  const { isRsvped, toggleRsvp, currentUserName } = useContext(RsvpContext);

  // Prefer events passed from App; fallback to state.event if navigated with state
  const allEvents = useMemo(() => {
    if (events && events.length) return events;
    if (state?.event) return [state.event];
    return [];
  }, [events, state]);

  const event = useMemo(() => {
    const idNum = Number(eventId);
    return allEvents.find((e) => Number(e.id) === idNum);
  }, [allEvents, eventId]);

  const [expanded, setExpanded] = useState(false);

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Event not found</p>
          <button
            onClick={() => navigate("/events")}
            className="mt-3 rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300"
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  // Base going list from event, plus "you" if RSVPed for this event
  const baseGoing = event.going ?? [];
  const host = event.host;

  const goingWithYou = useMemo(() => {
    const already = baseGoing.some((p) => p.name === currentUserName);
    if (!isRsvped(event.id)) return baseGoing;
    return already ? baseGoing : [...baseGoing, { name: currentUserName }];
  }, [baseGoing, currentUserName, event, isRsvped]);

  // Counts/capacity
  const goingCount = goingWithYou.length;
  let cap = 0;
  if (typeof event.capacity === "number") {
    cap = event.capacity;
  } else if (event.attendees) {
    const parts = String(event.attendees).split("/");
    cap = Number(parts[1]) || 0;
  }

  const handleDeleteClick = () => {
    deleteEvent(event.id);
    navigate("/events");
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <main className="overflow-scroll flex flex-col gap-[1rem] bg-white text-neutral-900 min-h-screen pb-[6rem] relative">
      {/* Header */}
      <div className="flex items-center gap-[1rem] h-[5rem] px-[1.5rem] bg-custom-beige border-b border-custom-gray">
        <button onClick={() => navigate(-1)}>
          <BackIcon className="h-5 w-5 text-custom-dark-gray" />
        </button>
        <h1 className="font-bold text-[1.25rem]">Event Details</h1>
      </div>

      {/* Event card */}
      <div className="px-[1.5rem] pb-[1rem]">
        <div className="bg-white rounded-xl shadow-md border border-custom-light-gray overflow-hidden">
          <div className="p-[1rem]">
            <div className="flex items-center justify-between">
              {/* Title */}
              <h2 className="text-xl font-semibold">{event.title}</h2>
              {/* Delete button */}
              {host === currentUserName ? (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => navigate(`/events/${eventId}/edit`)}
                    className="flex items-center gap-[0.5rem] w-fit pl-3 rounded-2xl text-center font-semibold active:scale-[.99] text-black"
                  >
                    <EditIcon className="h-4 w-4" />
                    Edit Event
                  </button>
                  <button
                    onClick={() => setConfirmOpen(true)}
                    className="flex items-center gap-[0.5rem] w-fit rounded-2xl pl-3  text-center font-semibold active:scale-[.99] text-red-800"
                  >
                    <DeleteIcon className="h-4 w-4" />
                    Delete Event
                  </button>
                </div>
              ) : null}
            </div>

            {/* Meta */}
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
                  {cap ? `${goingCount}/${cap}` : event.attendees || goingCount}
                </span>
              </li>
            </ul>

            {/* Description */}
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

              {goingWithYou.length > 0 ? (
                <ul className="space-y-2">
                  {goingWithYou.map((p) => {
                    const initials = p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("");
                    const isYou = p.name === currentUserName;

                    return (
                      <li
                        key={p.name}
                        className="flex items-center justify-between rounded-2xl border border-custom-gray px-[0.75rem] py-[0.5rem]"
                      >
                        <div className="flex items-center gap-[0.5rem]">
                          <div className="h-6 w-6 rounded-full bg-custom-light-gray flex items-center justify-center text-[0.7rem] font-semibold text-custom-dark-gray">
                            {initials}
                          </div>
                          <p className="flex items-center text-[0.875rem] text-black gap-[0.5rem]">
                            {p.name}
                            {p.isHost ? (
                              <span className="text-[0.75rem] text-custom-dark-gray">
                                (host)
                              </span>
                            ) : null}
                            {isYou ? (
                              <span className="text-[0.75rem] text-custom-dark-gray">
                                (you)
                              </span>
                            ) : null}
                          </p>
                        </div>

                        {/* Hide icons for yourself */}
                        {!isYou && (
                          <div className="flex items-center gap-[0.5rem] text-custom-dark-gray">
                            {p.carSeats && (
                              <div className="flex flex-col items-center text-xs leading-tight">
                                <div className="flex items-center gap-1">
                                  <Car className="h-4 w-4" />
                                  <span>
                                    {p.carSeats.taken}/{p.carSeats.total}
                                  </span>
                                </div>
                                <span className="text-[0.625rem] text-custom-dark-gray">
                                  carpool
                                </span>
                              </div>
                            )}
                            <Link to={"/conversation"}>
                              <button>
                                <MessageSquare className="h-4 w-4" />
                              </button>
                            </Link>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-sm text-custom-dark-gray">
                  No attendees yet.
                </div>
              )}
            </div>
            {/* RSVP button */}
            <div className="p-[1rem] px-[1.5rem]">
              <button
                onClick={() => toggleRsvp(event.id)}
                className={`w-full rounded-2xl p-3 text-center font-semibold shadow transition active:scale-[.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isRsvped(event.id)
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600"
                    : "bg-custom-dark-blue text-white focus:ring-custom-dark-blue"
                }`}
              >
                {isRsvped(event.id) ? "RSVP’d" : "RSVP"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[80%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Delete Event?</h2>
            <p className="text-sm mb-6 text-neutral-700">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 rounded-xl py-2 bg-neutral-200 text-neutral-800"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeleteClick();
                }}
                className="flex-1 rounded-xl py-2 bg-red-600 text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
