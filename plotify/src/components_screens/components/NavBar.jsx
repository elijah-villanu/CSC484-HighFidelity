import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

import {
  House as HomeIcon,
  Calendar as CalendarIcon,
  MessagesSquare as MessagesIcon,
} from "lucide-react";

export default function NavBar() {

  const location = useLocation();

  const [currentPath, setPath] = useState(location.pathname)

  useEffect(() => {
      setPath(location.pathname)
    }, [location]);

  return (
    <nav className="min-h-full min-w-full bg-white border-t-1 border-t-solid border-t-custom-gray">
      <ul className="flex min-w-full min-h-full">
        <li className="flex flex-grow items-center justify-center">
          <Link to={"/"} className={currentPath=="/" | currentPath =="/home" ? "flex flex-col items-center text-custom-dark-blue" : "flex flex-col items-center text-custom-gray"} >
            <HomeIcon className={currentPath=="/" | currentPath =="home" ? "text-custom-dark-blue" : "text-custom-gray"} />
            Home
          </Link>
        </li>
        <li className="flex flex-grow items-center justify-center">
          <Link to={"/events"} className={currentPath=="/events" | currentPath.startsWith("/events") ? "flex flex-col items-center text-custom-dark-blue" : "flex flex-col items-center text-custom-gray"}>
            <CalendarIcon className={currentPath=="/events" | currentPath.startsWith("/events") ? "text-custom-dark-blue" : "text-custom-gray"} />
            Events
          </Link>
        </li>
        <li className="flex flex-grow items-center justify-center">
          <Link to={"/messages"} className={currentPath=="/messages" | currentPath =="/conversation" ? "flex flex-col items-center text-custom-dark-blue" : "flex flex-col items-center text-custom-gray"}>
            <MessagesIcon className={currentPath=="/messages" | currentPath=="/conversation" ? "text-custom-dark-blue" : "text-custom-gray"} />
            Messages
          </Link>
        </li>
      </ul>
    </nav>
  );
}
