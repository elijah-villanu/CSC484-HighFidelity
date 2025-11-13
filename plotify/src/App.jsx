import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./components_screens/Home";
import Events from "./components_screens/Events";
import Messages from "./components_screens/Messages";
import NavBar from "./components_screens/components/NavBar";
import SpecificEvent from "./components_screens/SpecificEvent";
import CreateEvent from "./components_screens/CreateEvent";
import Conversation from "./components_screens/Conversation";

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
      going: [],
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
    },
  ];
  
  // Id assignment will be tracked by a counter in local storage (temporary)
  const [events, setEvents] = useState(initEvents);
  localStorage.setItem('ids',initEvents.length);

  const handleCreate = (newEvent) => {
    // Iterate and set event id
    const newId = parseInt(localStorage.getItem('ids')) + 1
    newEvent.id = newId
    localStorage.setItem('ids', newId);

    // Add event and set state
    events.push(newEvent)
    setEvents(events)
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<Home events={events}/>} />

        <Route path="/home" element={<Home events={events}/>} />

        <Route path="/events" element={<Events events={events} />} />

        <Route path="/events/:eventId" element={<SpecificEvent events={events} />} />

        <Route path="/messages" element={<Messages />} />

        <Route path="/events/create" element={<CreateEvent create={handleCreate}/>} />

        <Route path="/conversation" element={<Conversation/>} />

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
