"use client";
import { getAllEvents } from "@/lib/database/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { SearchParamProps } from "@/types";
import { useParams } from "next/navigation";
import { IEvent } from "@/lib/database/models/event.model";
import CategoryFilter from "./CategoryFilter";
import { eventsList } from "@/constants";

const EventCollection = ({ searchParams }: SearchParamProps) => {
  const [eventList, setEventList] = useState<IEvent[]>([]);
  // const [query, setQuery] = useState<string>("");

  // const getQuery = () => {
  //   setQuery(query);
  // };

  const query = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const getEvents = async () => {
    const events = await getAllEvents({ query, category });
    // const events = orderData.map()
    setEventList(events);
  };

  // const handleGetUsearchedEvents = async () => {
  //   const events = await getAllEvents({ query, category });
  //   // const events = orderData.map()
  //   setEventList(events);
  // };

  useEffect(() => {
    getEvents();
  }, [query, eventList]);
  return (
    <section className="lg:px-32 mt-10 mb-10">
      <div className="wrapper ">
        <h1 className="h2-bold mb-5">Register for an event</h1>
        <div className="lg:flex gap-3 mb-5">
          {/* <input
            placeholder="search"
            className="bg-slate-100 w-full rounded-2xl my-3 p-3"
          /> */}
          <Search />
          {/* <input
            placeholder="category"
            className="bg-slate-100 w-full rounded-2xl my-3 p-3 "
          /> */}
          <CategoryFilter />
        </div>

        {/* event list */}
        <div className="lg:grid grid-cols-3 gap-7 ">
          {eventsList == null && (
            <div>
              <h1>no events available</h1>
            </div>
          )}
          {eventList.length < 1 && (
            <div className="lg:flex justify-center py-3 shadow-lg border-2 rounded-lg">
              <h1 className="text-center my-5">Loading events...</h1>
            </div>
          )}
          {eventList.map((event) => {
            return (
              <div className=" shadow-lg rounded-2xl  lg:w-[350px] lg:h-[360px]">
                <div>
                  <Image
                    className=" w-full h-[10rem] object-cover rounded-t-2xl mb-10"
                    src={event.imageUrl}
                    width={500}
                    height={500}
                    alt="image"
                  />
                  <Link href={`/events/${event._id}/update`}>
                    <div>
                      {/* <Image
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={45}
                        height={45}
                        className="relative bg-white z-20 rounded-xl p-3 top-[90%] left-[91%] lg:left-[85%]"
                      /> */}
                    </div>
                  </Link>
                </div>

                {/* event details */}
                <div className="lg:mt-[-2.5rem] mt-[-2rem] capitalize mx-5 mb-10 py-5">
                  <p className="mb-5 flex items-center gap-5   ">
                    <small className="bg-emerald-200 p-2 rounded-full px-3">
                      <span>&#8358;</span> {event.price}
                    </small>
                    <small className="bg-slate-100 px-3 py-2 rounded-full">
                      {event.category.name}
                    </small>
                  </p>
                  <p>{formatDateTime(event.startDateTime!).dateOnly} </p>
                  <p className="capitalize font-bold text-lg mt-3">
                    <Link href={`/events/${event._id}/`}>{event.title}</Link>
                  </p>

                  <p className="capitalize my-5 lg:mt-0 lg:mb-5">
                    organizer : {event?.organizer?.firstname}{" "}
                    {event?.organizer?.lastname}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventCollection;
