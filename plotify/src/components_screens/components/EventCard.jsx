import { Link } from "react-router";
import { Calendar as CalendarIcon, Clock as TimeIcon, MapPin as LocationIcon, Users as CapacityIcon } from "lucide-react";

export default function EventCard(props) {
  return (
    <Link
            to={props.linkTo}
            key={props.id}
            className="block border border-custom-gray rounded-2xl p-[1rem] shadow-xs bg-white"
          >

            {props.eventTitle ? <><h2 className="font-semibold text-[1.125rem] mb-1">{props.eventTitle}</h2></> : null}

            <div className="text-custom-dark-gray text-[0.875rem] flex flex-col gap-[0.25rem]">
              {props.eventDate && props.eventTime ? 
              <div className="flex items-center space-x-1">
                {props.eventDate ? <><CalendarIcon className = "h-4 w-4 text-custom-dark-gray" /><span>{props.eventDate}</span></> : null}
                {props.eventTime ? <><TimeIcon className = "h-4 w-4 text-custom-dark-gray" /><span>{props.eventTime}</span></> : null}
              </div> : null }

              <div className="flex items-center space-x-1">
                {props.eventLocation ? <><LocationIcon className = "h-4 w-4 text-custom-dark-gray" />{!props.eventTitle ? <h2 className="font-semibold text-[1.125rem] text-black">{props.eventLocation}</h2> : <span>{props.eventLocation}</span>}</> : null }
              </div>

              {props.eventCapacity ? 
              <div className="flex items-center space-x-1">
                
                <CapacityIcon className = "h-4 w-4 text-custom-dark-gray" /><span>{props.eventCapacity}</span>
                
              </div>
              : null}
            </div>
          </Link>
  );
}
