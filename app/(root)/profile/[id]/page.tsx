"use client";
import {
  getEventsCreatedByUser,
  getOrdersByUser,
} from "@/lib/database/actions/order.actions";
import { getTheUser } from "@/lib/database/actions/user.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { IOrder } from "@/lib/database/models/order.model";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

type userParams = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
};

const page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [createdEvents, setCreatedEvents] = useState<IEvent[]>([]);
  const [user, setUser] = useState<userParams>();

  // const cookie = new Cookies();
  // const userId = cookie?.get("userId");

  const userObject = useParams<{ id: string }>();
  const userId = userObject?.id as string;

  const getRelatedEvents = async () => {
    const userOrders = await getOrdersByUser(userId);
    // const orderedEvents =
    //   userOrders?.data.map((order: IOrder) => order.event) || [];
    setOrders(userOrders);

    const createdEvents = await getEventsCreatedByUser(userId);
    // const eventsCreatedByUser =
    //   createdEvents?.data?.map((event: IEvent) => event) || [];
    setCreatedEvents(createdEvents);
  };

  const handleGetUser = async () => {
    const user = await getTheUser(userId);

    setUser(user);
  };

  useEffect(() => {
    console.log(orders);
    handleGetUser();
    getRelatedEvents();
  }, []);
  console.log(orders);
  return (
    <div className="capitalize">
      {/* top */}
      <div className="relative p-5  mb-20 bg-slate-100 lg:px-32 flex py-8 justify-between items-center">
        <h1 className="text-2xl font-bold">my proflie</h1>
        <button className="bg-purple-800 hidden rounded-full px-5 py-2 text-white">
          edit profile
        </button>
      </div>

      {/* user details */}
      <div className="absolute lg:w-[40%] w-[80%] py-2 top-[9.4rem] gap-3 bg-white flex items-center px-5 mx-5  rounded-xl shadow-lg mb-3">
        <h1>
          {user?.firstname} {user?.lastname}
        </h1>
        <h1 className="my-2">{user?.email}</h1>
        <h1>{user?.username}</h1>
      </div>

      <div className="p-5 bg-slate-100 lg:px-32 flex py-8 justify-between items-center">
        <h1 className="text-2xl font-bold">my tickets</h1>
        <button className="bg-purple-800 rounded-full px-5 py-2 text-white">
          Buy tickets
        </button>
      </div>
      {/* details of user orders */}
      <div className="lg:px-32 lg:flex bg-white w-full">
        {/* on no orders yet */}
        {orders.length < 1 && (
          <div className="lg:mt-10 mx-5 py-2 lg:w-[60vh] lg:h-[15vh] shadow-lg rounded-2xl my-5 lg:p-3 lg:m-auto">
            <h1 className="text-center lg:m-auto  lg:my-3 my-10 text-gray-500">
              {" "}
              you havent bought any tickets yet
            </h1>
          </div>
        )}

        {/* when users have orders */}
        {orders.map((order) => {
          return (
            <div className="mx-5 shadow-lg rounded-2xl my-5 lg:w-[350px] lg:h-[360px]">
              {}
              <Image
                className="w-full h-[10rem] object-cover rounded-t-2xl"
                src={order.event.imageUrl}
                width={400}
                height={400}
                alt="image"
              />

              {/*  details of orders */}
              <div className="capitalize mx-5 lg:mt-2 mt-4 mb-10 py-8">
                <p className="mb-5 flex items-center gap-5 lg:mt-[-5px]">
                  <small className="bg-emerald-200 p-2 rounded-full px-3">
                    <span>&#8358;</span> {order?.event?.price}
                  </small>
                  <small className="bg-slate-100 px-3 py-2 rounded-full">
                    {/* {order?.event?.category.name} */}
                  </small>
                </p>
                <p>{formatDateTime(order?.event?.startDateTime!).dateOnly} </p>
                <p className="capitalize font-bold text-lg mt-3">
                  <Link href={`/events/${order?._id}/`}>
                    {order?.event?.title}
                  </Link>
                </p>

                <p className="capitalize my-5">
                  organizer : {order?.buyer?.firstname} {order?.buyer?.lastname}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* button to create events */}
      <div className="p-5 bg-slate-100 mt-10 lg:px-32 flex py-8 justify-between items-center">
        <h1 className="text-2xl font-bold">my events </h1>
        <button className="text-sm bg-purple-800 rounded-full px-5 py-2 text-white">
          <Link href="/events/create">Create events</Link>
        </button>
      </div>

      {/* maping through created events */}
      <div className="lg:px-32 lg:flex bg-white w-full">
        {createdEvents?.map((event) => {
          return (
            <div className="mx-5 shadow-lg rounded-2xl my-5 lg:w-[350px] lg:h-[360px]">
              <div>
                <Image
                  className="w-full  h-[10rem] object-cover rounded-t-2xl"
                  src={event.imageUrl}
                  width={400}
                  height={400}
                  alt="image"
                />

                <Link href={`/orders/${event._id}`}>
                  <div>
                    <Image
                      src="/assets/icons/edit.svg"
                      alt="edit"
                      width={45}
                      height={45}
                      className="relative bg-white z-20 rounded-xl p-3 top-[90%] left-[90%] lg:left-[85%]"
                    />
                  </div>
                </Link>
              </div>

              {/* event details */}
              <div className="mt-[-2rem] capitalize mx-5 lg:mt-[-2.5rem] lg:mb-20 mb-10 py-8">
                <p className="lg:mt-[-10px] mb-5 flex items-center gap-5">
                  <small className="bg-emerald-200 p-2 rounded-full px-3">
                    <span>&#8358;</span> {event?.price}
                  </small>
                  <small className="bg-slate-100 px-3 py-2 rounded-full">
                    {event.category.name}
                  </small>
                </p>
                <p>{formatDateTime(event.startDateTime!).dateOnly} </p>
                <p className="capitalize font-bold text-lg mt-3 lg:mt-1">
                  <Link href={`/events/${event._id}/`}>{event.title}</Link>
                </p>

                <p className="capitalize my-5 lg:mt-0">
                  organizer : {event?.organizer?.firstname}{" "}
                  {event?.organizer?.lastname}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* on no events created */}
      {createdEvents.length < 1 && (
        <div className="lg:mt-10 mx-5 py-2 lg:w-[60vh] lg:h-[15vh] shadow-lg rounded-2xl my-5 lg:p-3 lg:m-auto">
          <h1 className="text-center lg:my-3 my-10 text-gray-500">
            {" "}
            you havent created any events yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;
