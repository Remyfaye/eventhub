"use client";
import {
  getAllEvents,
  getRelatedEvents,
} from "@/lib/database/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { GetRelatedEventsByCategoryParams } from "@/types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RelatedEvents = ({
  categoryId,
  eventId,
}: GetRelatedEventsByCategoryParams) => {
  const [eventList, setEventList] = useState([]);

  // const eventList = await getAllEvents();
  const getTheEvent = async () => {
    const eventList = await getRelatedEvents({ categoryId, eventId });
    setEventList(eventList);
  };
  useEffect(() => {
    getTheEvent();
  }, [categoryId, eventId]);

  // console.log(eventList);
  return (
    <section className="lg:px-32 mt-2 mb-10">
      <div className="wrapper ">
        <h1 className="h2-bold mb-5 lg:mb-8 lg:mt-10">Related Events</h1>

        {/* event list */}
        <div className="lg:flex gap-7">
          {eventList.map(
            (event: {
              [x: string]: any;
              img: string | StaticImport;
              price:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              tag:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              date:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              title:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              organizer:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
            }) => {
              return (
                <div className=" shadow-lg rounded-2xl my-5 lg:w-[350px] lg:h-[360px]">
                  <Image
                    className="w-full h-[10rem] object-cover rounded-t-2xl"
                    src={event.imageUrl}
                    width={400}
                    height={400}
                    alt="image"
                  />

                  {/* event details */}
                  <div className="capitalize mx-5 mt-4 mb-10 py-5 lg:mt-0">
                    <p className="mb-5 flex items-center gap-5">
                      <small className="bg-emerald-200 p-2 rounded-full px-3">
                        <span>&#8358;</span> {event.price}
                      </small>
                      <small className="bg-slate-100 px-3 py-2 rounded-full">
                        {event.category.name}
                      </small>
                    </p>
                    <p>{formatDateTime(event.startDateTime).dateOnly} </p>
                    <p className="capitalize font-bold text-lg mt-3">
                      <Link href={`/events/${event._id}/`}>{event.title}</Link>
                    </p>

                    <p className="capitalize my-5 lg:my-2">
                      organizer : {event?.organizer?.firstname}{" "}
                      {event?.organizer?.lastname}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedEvents;
