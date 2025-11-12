import { Link } from "react-router";
import { Calendar as CalendarIcon, Clock as TimeIcon, MapPin as LocationIcon, Users as CapacityIcon } from "lucide-react";

export default function EventCard(props) {
  return (
    <Link
            to={props.linkTo}
            key={props.id}
            className="block border rounded-2xl p-4 shadow-sm bg-white"
          >
            <h2 className="font-semibold text-lg mb-1">{props.eventTitle}</h2>

            <div className="text-gray-700 text-sm space-y-1">
              <div className="flex items-center space-x-2">
                <CalendarIcon className = "h-4 w-4 text-neutral-600" />
                <span>{props.eventDate}</span>
                <TimeIcon className = "h-4 w-4 text-neutral-600" />
                <span>{props.eventTime}</span>
              </div>

              <div className="flex items-center space-x-2">
                <LocationIcon className = "h-4 w-4 text-neutral-600" />
                <span>{props.eventLocation}</span>
              </div>

              <div className="flex items-center space-x-2">
                <CapacityIcon className = "h-4 w-4 text-neutral-600" />
                <span>{props.eventCapacity}</span>
              </div>
            </div>
          </Link>
  );
}
