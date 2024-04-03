"use client";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import {
  checkoutOrder,
  createOrder,
} from "@/lib/database/actions/order.actions";
import { useRouter } from "next/navigation";
// import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export type eventParams = {
  event: IEvent;
  userId: string;
};

const Checkout = ({ event, userId }: eventParams) => {
  const eventId = event?._id;
  const buyerId = userId;
  const router = useRouter();
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    // console.log(event.title);
    // alert("heer");
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      // isFree: event.isFree,
      buyerId: userId,
    };

    if (userId.length < 2) {
      router.push("/sign-up");
    } else {
      await createOrder({ eventId, buyerId });
      await checkoutOrder(order);
    }
  };

  return (
    <div>
      <button role="link" onClick={onCheckout}>
        {"Get Ticket"}
      </button>
    </div>
  );
};

export default Checkout;
