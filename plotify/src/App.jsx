import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./components_screens/Home";
import Events from "./components_screens/Events";
import Messages from "./components_screens/Messages";
import NavBar from "./components_screens/components/NavBar";
import SpecificEvent from "./components_screens/SpecificEvent";
import CreateEvent from "./components_screens/CreateEvent";


function App() {
  const initEvents = [
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
      attendees: "",
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
      attendees: "",
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
        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route path="/events/:eventId" element={<SpecificEvent />} />

        <Route path="/messages" element={<Messages />} />

        <Route path="/events/create" element={<CreateEvent create={handleCreate}/>} />

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
      <NavBar />
    </>
  );
}

export default App;
