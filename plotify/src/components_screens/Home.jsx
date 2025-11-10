import { Link } from "react-router";
import EventCard from "./components/EventCard";

export default function Home() {
  return (
    <main className="overflow-scroll flex flex-col gap-[1rem]">
      <div className="flex items-center gap-[1rem] p-[1rem] bg-custom-beige">
        <div className="size-[3rem] overflow-hidden flex items-center justify-center rounded-full">
          <img
            className="w-full"
            alt="John Doe"
            src="https://images.pexels.com/photos/8638714/pexels-photo-8638714.jpeg"
          />
        </div>
        <p>John Doe</p>
      </div>

      <div className="px-[1rem]">
        <h2>Hosting</h2>
        <Link to={"/events"}>See All</Link>
        <EventCard
          linkTo="/home"
          id="1"
          eventTitle="Event Title"
          eventDate="Nov. 10"
          eventTime="8:30am – 9:00am"
          eventLocation="UU Plaza"
          eventCapacity="2/10"
        />
      </div>
      <div className="px-[1rem]">
        <h2>Attending</h2>
        <Link to={"/events"}>See All</Link>
        <EventCard
          linkTo="/home"
          id="1"
          eventTitle="Event Title"
          eventDate="Nov. 10"
          eventTime="8:30am – 9:00am"
          eventLocation="UU Plaza"
          eventCapacity="2/10"
        />
      </div>
      <div className="px-[1rem]">
        <h2>Frequently Attended</h2>
        <Link to={"/events"}>See All</Link>
        <EventCard
          linkTo="/home"
          id="1"
          eventTitle="Event Title"
          eventDate="Nov. 10"
          eventTime="8:30am – 9:00am"
          eventLocation="UU Plaza"
          eventCapacity="2/10"
        />
      </div>
    </main>
  );
}
