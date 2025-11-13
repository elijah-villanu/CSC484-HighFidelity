import { Link } from "react-router";
import EventCard from "./components/EventCard";

export default function Home(props) {
  const user = "Jane L.";
  const events = props.events;

  // --- Shared Helper Utilities ---
  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.",
  ];

  const parseDate = (dateStr) => {
    const [monthStr, dayStr] = dateStr.split(" ");
    return {
      monthIndex: months.indexOf(monthStr),
      day: parseInt(dayStr),
    };
  };

  const getSoonestEvent = (events, filterFn) => {
    // Apply filter
    const filteredEvents = events.filter(filterFn);

    if (filteredEvents.length === 0) return null;

    // Sort by month/day
    filteredEvents.sort((a, b) => {
      const aDate = parseDate(a.date);
      const bDate = parseDate(b.date);
      if (aDate.monthIndex !== bDate.monthIndex) {
        return aDate.monthIndex - bDate.monthIndex;
      }
      return aDate.day - bDate.day;
    });

    return filteredEvents[0];
  };

  // --- Specific Getters Using Shared Logic ---
  const getSoonestEventHosting = () =>
    getSoonestEvent(events, (e) => e.host === user);

  const getSoonestEventAttending = () =>
    getSoonestEvent(
      events,
      (e) => Array.isArray(e.going) && e.going.some((p) => p.name === user)
    );
  return (
    <main className="overflow-scroll flex flex-col gap-[1rem]">
      <div className="flex items-center gap-[1rem] px-[1.5rem] py-[1rem] bg-custom-beige h-[5rem] border-b border-custom-gray">
        <div className="h-full aspect-square overflow-hidden flex items-center justify-center rounded-full">
          <img
            className="w-full"
            alt="John Doe"
            src="https://images.pexels.com/photos/8638714/pexels-photo-8638714.jpeg"
          />
        </div>
        <p className="font-bold text-[1.125rem]">John Doe</p>
      </div>
      <div className="px-[1.5rem]">
        <div className="flex justify-between items-center mb-[0.5rem]">
          <h2 className="text-[1.25rem] font-semibold">Hosting</h2>
          <Link to="/events" className="text-custom-green underline underline-offset-4">See All</Link>
        </div>
        {!getSoonestEventHosting() ? (
          <p>
            You aren't hosting any events.{" "}
            <Link to="/events/create" className="text-custom-green underline underline-offset-4">Create Event</Link>
          </p>
        ) : (
          <EventCard
            linkTo={`/events/${getSoonestEventHosting().id}`}
            id={getSoonestEventHosting().id}
            eventTitle={getSoonestEventHosting().title}
            eventDate={getSoonestEventHosting().date}
            eventTime={getSoonestEventHosting().time}
            eventLocation={getSoonestEventHosting().location}
            eventCapacity={getSoonestEventHosting().attendees}
          />
        )}
      </div>
      <div className="px-[1.5rem]">
        <div className="flex justify-between items-center mb-[0.5rem]">
          <h2 className="text-[1.25rem] font-semibold">Attending</h2>
          <Link to="/events" className="text-custom-green underline underline-offset-4">See All</Link>
        </div>
        {!getSoonestEventAttending() ? (
          <p>
            You aren't attending any events.{" "}
            <Link to="/events" className="text-custom-green underline underline-offset-4">Browse Events</Link>
          </p>
        ) : (
          <EventCard
            linkTo={`/events/${getSoonestEventAttending().id}`}
            id={getSoonestEventAttending().id}
            eventTitle={getSoonestEventAttending().title}
            eventDate={getSoonestEventAttending().date}
            eventTime={getSoonestEventAttending().time}
            eventLocation={getSoonestEventAttending().location}
            eventCapacity={getSoonestEventAttending().attendees}
          />
        )}
      </div>
      <div className="px-[1.5rem]">
        <div className="flex justify-between items-center mb-[0.5rem]">
          <h2 className="text-[1.25rem] font-semibold">Frequently Attended</h2>
        </div>
        <div className="flex flex-col gap-[1rem]">
        <EventCard
          linkTo="/"
          eventLocation="Frog n/ Peach Pub"
        />
        <EventCard
          linkTo="/"
          eventLocation="Black Sheep Bar and Grill"
        />
        <EventCard
          linkTo="/"
          eventLocation="Woodstock's Pizza SLO"
        />
        </div>
      </div>
    </main>
  );
}
