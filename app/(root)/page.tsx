"use client";
import EventCollection from "@/components/shared/EventCollection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { eventsList } from "@/constants";
import { getAllEvents } from "@/lib/database/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ searchParams }: SearchParamProps) {
  const [eventList, setEventList] = useState<IEvent[]>([]);

  const query = (searchParams?.query as string) || "";

  // const getOrders = async () => {
  //   await getAllEvents(query);
  //   // const events = orderData.map()
  //   // setEventList(events);
  // };

  useEffect(() => {
    // getOrders();
    // getRelatedEvents();
  }, []);
  // const events = await getAllEvents(query);

  return (
    <>
      <section className="lg:pt-10 lg:h-screen lg:px-32 bg-slate-100 bg-contain md:py-5 py-5 bg-dotted-pattern">
        <div className="wrapper items-center sm:flex">
          {/* hero text */}
          <div className="sm:w-[70%] lg:w-[60%] ">
            <h1 className="h3-bold mb-5 ">
              Plan, Host, and attend virtual and physical events on our platform{" "}
            </h1>
            <p className="capitalize text-sm mb-5 sm:text-lg">
              book, register and buy tickets for seminars, workshops,
              conference, cohorts and much more
            </p>
            <Button
              className="sm:w-fit mt-5 capitalize button w-full bg-purple-800"
              size="lg"
            >
              <Link href="/events/search">register now</Link>
            </Button>
          </div>

          {/* hero image */}
          <Image
            src="/assets/images/hero.png"
            width={400}
            height={100}
            alt="image"
            className="sm:w-[30%]  object-contain flex items-center justify-center m-auto"
          />
        </div>
      </section>
      {/* <Search /> */}
      {/* event collection */}
      <EventCollection
        searchParams={searchParams}
        params={{
          id: "",
        }}
      />
    </>
  );
}
