import { IEvent } from "@/lib/database/models/event.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event }: CardProps) => {
  console.log(event);
  return (
    <div className=" shadow-lg rounded-2xl my-5">
      <Image
        className="w-full h-[10rem] object-cover rounded-t-2xl"
        src="/assets/images/test-2.png"
        width={108}
        height={28}
        alt="image"
      />

      {/* event details */}
      <div className="capitalize mx-5 my-10 py-5">
        <p className="mb-5 flex items-center gap-5">
          <small className="bg-emerald-200 p-2 rounded-xl">{event.price}</small>
          <small className="bg-slate-100 px-3 py-2 rounded-xl">
            {/* {event.tag} */}
          </small>
        </p>
        {/* <p>{event?.startDateTime}</p> */}
        <p className="capitalize font-bold text-lg">
          <Link href={`/events/${event._id}/`}>{event.title}</Link>
        </p>

        {/* <p className="capitalize my-5">{event.organizer}</p> */}
      </div>
    </div>
  );
};

export default Card;
