"use client";

import Checkout from "@/components/shared/Checkout";
import EventCollection from "@/components/shared/EventCollection";
import RelatedEvents from "@/components/shared/RelatedEvents";
import { getAnEvent } from "@/lib/database/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { setEnvironmentData } from "worker_threads";
interface ParamsType {
  id: string;
}

type eventParams = {
  title: string;
  price: string;
  organizer: string;
  category: string;
  startDateTime: string;
  endDateTime: string;
  description: string;
};

const page = () => {
  const [event, setEvent] = useState<IEvent>();
  const eventIdObject = useParams<{ id: string }>();
  const eventId = eventIdObject?.id;
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const getTheEvent = async () => {
    const event = await getAnEvent(eventId);
    setEvent(event);
  };
  useEffect(() => {
    console.log(event);
    getTheEvent();
  }, []);

  // const theEvent = [
  //   {
  //     title: "Github Universe 2024",
  //     price: "100",
  //     organizer: "jay",
  //     location: "ikeja,lagos",
  //     category: "artificial inteligence",
  //     startDateTime: "tue, jan 2 2024",
  //     endDateTime: "tue, jan 2 2024",
  //     description:
  //       "What Youll Learn: Universe 24 Is About AI, Security And The Developer Experience, About How To Spark Innovation, Stay In The Flow, Optimize Collaboration And Prevent Vulnerabilities With AI Powered Security    ",
  //   },
  // ];
  // console.log(event);

  // useEffect(() => {
  //   getEvent();
  // }, [event]);
  return (
    <section>
      <div className="lg:px-32 object-contain lg:grid grid-cols-2 gap-5 bg-slate-100 pb-5 lg:h-[70vh]">
        {/* top image */}
        <div className="lg:h-[50%]">
          <Image
            src="/assets/images/event21.jpg"
            width={700}
            height={700}
            alt="image"
            className="lg:w-full lg:h-[70vh] object-cover h-[30vh] w-full "
          />{" "}
        </div>

        <div className="lg:h-[60vh] m-5 capitalize lg:mt-2">
          <h1 className="h3-bold mb-3 ">{event?.title}</h1>
          <div className="mb-5 lg:flex items-center gap-5">
            {/* price & category */}
            <div className="flex gap-3 items-center ">
              <p className="bg-emerald-200 text-green-900 rounded-full px-4 py-1">
                {" "}
                <span>&#8358;</span> {event?.price}
              </p>
              <h1 className="bg-gray-200 text-gray-500 p-2 rounded-full ">
                {event?.category?.name}
              </h1>
            </div>
            {/* organizer */}
            <span className="flex gap-2  items-center mt-5 lg:mt-0">
              <p className="lowercase font-semibold">by:</p>
              <h1 className="text-gray-500">{event?.organizer?.firstname}</h1>
              <h1 className="text-gray-500">{event?.organizer?.lastname}</h1>
            </span>
          </div>

          {/* buy ticket button */}
          <button className="mb-5 capitalize text-[14px] py-2 px-5 font-sm rounded-full bg-purple-700 text-blue-100">
            {userId === undefined ? (
              <Link href="/sign-up">get ticket</Link>
            ) : (
              <Checkout event={event} userId={userId} />
            )}
            {/* buy ticket */}
          </button>

          {/* date button */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/icons/calendar.svg"
              width={30}
              height={30}
              alt="image"
              className=""
            />
            <span className=" text-gray-500">
              {formatDateTime(event?.startDateTime!).dateOnly} -{" "}
              {formatDateTime(event?.endDateTime!).dateOnly}
            </span>
          </div>

          {/* location */}
          <div className="mt-3 flex items-center gap-3">
            <Image
              src="/assets/icons/location.svg"
              width={30}
              height={30}
              alt="image"
              className=""
            />
            <span className=" text-gray-500">{event?.location}</span>
          </div>

          {/* description */}
          <p className="mt-5 text-gray-700 p-medium-16 maxLength={100} ">
            {event?.description?.length > 200
              ? event?.description.slice(0, 200)
              : event?.description}
          </p>
          <div></div>
        </div>
      </div>

      <div>
        <RelatedEvents eventId={event?._id} categoryId={event?.category._id} />
      </div>
    </section>
  );
};

export default page;
