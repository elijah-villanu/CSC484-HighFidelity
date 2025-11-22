/* eslint-disable react-refresh/only-export-components */
import "./App.css";
import React, { useState, createContext, useMemo, useCallback } from "react";
import { Routes, Route } from "react-router";
import Home from "./components_screens/Home";
import Events from "./components_screens/Events";
import Messages from "./components_screens/Messages";
import NavBar from "./components_screens/components/NavBar";
import SpecificEvent from "./components_screens/SpecificEvent";
import CreateEvent from "./components_screens/CreateEvent";
import Conversation from "./components_screens/Conversation";
import EditEvent from "./components_screens/EditEvent";

// NEW: RSVP context lives at the app root. It keeps RSVP state in memory so it
// survives route changes but clears on a full page reload.
export const RsvpContext = createContext({
  isRsvped: (_eventId) => false,
  toggleRsvp: (_eventId) => {},
  currentUserName: "John D.",
});


localStorage.setItem("ids", 5);

function App() {
  const initEvents = [
    {
      id: 1,
      title: "Chill Dinner",
      date: "Nov. 10",
      time: "6:00pm – 8:00pm",
      location: "In-n-Out",
      // keep this string if your Events list relies on it
      attendees: "2/5",
      // new fields:
      host: "Jane L.",
      capacity: 5,
      description:
        "Come join us at In-n-Out for some burgers and good vibes. Bring your friends and maybe a beer or two. We’ll grab a big table and hang out!",
      going: [
        { name: "Bob R.", carSeats: { taken: 1, total: 4 } },
        { name: "Jane L.", isHost: true },
      ],
      tags: ["Casual", "Food"],
    },
    {
      id: 2,
      title: "Pitch Perfect Movie Night",
      date: "Nov. 14",
      time: "7:00pm – 9:00pm",
      location: "1234 Coast Drive, San Luis Obispo, CA",
      attendees: "0/6",
      host: "Alex P.",
      capacity: 6,
      description:
        "We’re watching Pitch Perfect on a projector in the backyard. Blankets, snacks, and aca-tunes provided!",
      going: [ { name: "Alex P.", isHost: true}],
      tags: ["Casual", "Entertainment", "Outdoor"],
    },
    {
      id: 3,
      title: "Yoga Session",
      date: "Nov. 15",
      time: "6:00pm – 8:00pm",
      location: "Performing Arts Center",
      attendees: "1/5",
      host: "Morgan K.",
      capacity: 5,
      description:
        "Gentle vinyasa session suitable for all levels. Bring your mat and water.",
      going: [{ name: "Sam T." }],
      tags: ["Casual"],
    },
    {
      id: 4,
      title: "Food Festival",
      date: "Nov. 17",
      time: "7:00pm – 9:00pm",
      location: "Downtown",
      attendees: "0/8",
      host: "TBD",
      capacity: 8,
      description:
        "Explore local vendors downtown. We’ll walk, sample, and hang together.",
      going: [],
      tags: ["High Energy", "Entertainment", "Outdoor", "Food"],
    },
  ];

  // Id assignment will be tracked by a counter in local storage (temporary)
  const [events, setEvents] = useState(initEvents);

  // ===== In-memory RSVP state (survives navigation, resets on full reload) =====
  const [rsvpedEvents, setRsvpedEvents] = useState(() => new Set());

  const isRsvped = useCallback(
    (eventId) => rsvpedEvents.has(Number(eventId)),
    [rsvpedEvents]
  );

  const toggleRsvp = useCallback((eventId) => {
    setRsvpedEvents((prev) => {
      const next = new Set(prev);
      const id = Number(eventId);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  React.useEffect(() => {
  // Get all event ids where John D. is already going
  const johnsEvents = events
    .filter((event) =>
      event.going?.some((person) => person.name === "John D.")
    )
    .map((event) => event.id);

  // Toggle RSVP for each event only if not already RSVPed
  johnsEvents.forEach((id) => {
    if (!isRsvped(id)) {
      toggleRsvp(id);
    }
  });
}, [events]); // runs only when events are initially set


  const rsvpValue = useMemo(
    () => ({ isRsvped, toggleRsvp, currentUserName: "John D." }),
    [isRsvped, toggleRsvp]
  );

  const handleCreate = (newEvent) => {
    // Iterate and set event id
    const newId = parseInt(localStorage.getItem("ids")) + 1;
    console.log(newId)
    newEvent.id = newId;
    localStorage.removeItem("ids")
    localStorage.setItem("ids", newId);

    // Add event and set state
    events.push(newEvent);
    setEvents(events);

    // New events automatically RSVPs creator/host
    toggleRsvp(newId);
    newEvent.going = [{ name: "John D.", isHost: true }];
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // updates just find existing event id and adds edited fields
  const handleUpdate = (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(ev =>
        ev.id === updatedEvent.id ? { ...ev, ...updatedEvent } : ev
      )
  )};

  return (
    <RsvpContext.Provider value={rsvpValue}>
      <>
        <Routes>
          <Route path="/" element={<Home events={events} />} />

          <Route path="/home" element={<Home events={events} />} />

          <Route path="/events" element={<Events events={events} />} />

          <Route
            path="/events/:eventId"
            element={
              <SpecificEvent events={events} deleteEvent={handleDelete} />
            }
          />

          <Route path="/events/:eventId/edit" element={<EditEvent update={handleUpdate} eventList={events}/>} />

          <Route path="/messages" element={<Messages />} />

          <Route path="/events/create" element={<CreateEvent create={handleCreate} eventList={events}/>} />

          <Route path="/conversation" element={<Conversation />} />

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <NavBar />
      </>
    </RsvpContext.Provider>
  );
}

export default App;
