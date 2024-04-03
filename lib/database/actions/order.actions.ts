"use server";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectToDatabase } from "..";
import Order from "../models/order.model";
import Event from "../models/event.model";
import User from "../models/user.model";
import Category from "../models/category.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = Number(order.price) * 100;
  const userId = order.buyerId;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${userId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async ({ eventId, buyerId }: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const theEvent = await Event.findById(eventId);
    const buyer = await User.findById(buyerId);

    const newOrder = await Order.create({
      event: JSON.parse(JSON.stringify(theEvent)),
      buyer: JSON.parse(JSON.stringify(buyer)),
    });
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    throw error;
  }
};

// export const getUserOrders = async (userId: string) => {
//   try {
//     await connectToDatabase();
//     const userOrders = Order.find({
//       buyer: userId,
//     });
//     console.log(userOrders);
//     return JSON.parse(JSON.stringify(userOrders));
//   } catch (error) {
//     throw error;
//   }
// };
const populateEvent = (query: any) => {
  return query
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "organizer",
      model: "User",
    });
};
const populateOrder = (query: any) => {
  return query
    .populate({
      path: "event",
      model: "Event",
      // select: "_id title startDateTime",
    })
    .populate({
      path: "buyer",
      model: "User",
    });
};
export async function getOrdersByUser(userId: string) {
  try {
    await connectToDatabase();

    // const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await populateOrder(Order.find({ buyer: userId }));
    // .sort({ createdAt: "desc" })
    // // .skip(skipAmount)
    // // .limit(limit)
    // .populate({
    //   path: "event",
    //   model: Event,
    //   populate: {
    //     path: "organizer",
    //     model: User,
    //     select: "_id firstname lastname",
    //   },
    // });

    // const ordersCount = await Order.distinct("event._id").countDocuments(
    //   conditions
    // );
    // console.log(orders);
    return JSON.parse(JSON.stringify(orders));
    // totalPages: Math.ceil(ordersCount / limit),
    // };
  } catch (error) {
    throw error;
  }
}

export const getEventsCreatedByUser = async (userId: string) => {
  try {
    await connectToDatabase();
    const condition = { organizer: userId };
    const eventsCreatedByUser = await populateEvent(Event.find(condition));

    // console.log(eventsCreatedByUser);
    return JSON.parse(JSON.stringify(eventsCreatedByUser));
  } catch (error) {
    throw error;
  }
};

export const getOrdersByEvent = async (eventId: string) => {
  try {
    await connectToDatabase();
    const eventOrders = await populateOrder(Order.find({ event: eventId }));
    // console.log(eventOrders);
    return JSON.parse(JSON.stringify(eventOrders));
  } catch (error) {
    throw error;
  }
};
function populate(arg0: { path: string; model: string }) {
  throw new Error("Function not implemented.");
}
