import { Link } from "react-router";

import {
  House as HomeIcon,
  Calendar as CalendarIcon,
  MessagesSquare as MessagesIcon,
} from "lucide-react";

export default function Home() {
  return (
    <nav className="min-h-full min-w-full bg-white border-t-1 border-t-solid border-t-custom-gray">
      <ul className="flex min-w-full min-h-full">
        <li className="flex flex-grow items-center justify-center">
          <Link to={"/"} className="flex flex-col items-center">
            <HomeIcon />
            Home
          </Link>
        </li>
        <li className="flex flex-grow items-center justify-center">
          <Link to={"/events"} className="flex flex-col items-center">
            <CalendarIcon />
            Events
          </Link>
        </li>
        <li className="flex flex-grow items-center justify-center">
          <Link to={"/messages"} className="flex flex-col items-center">
            <MessagesIcon />
            Messages
          </Link>
        </li>
      </ul>
    </nav>
  );
}
