// import Search  from '@/components/shared/Search'
"use client";
// import { getOrdersByEvent } from '@/lib/actions/order.actions'
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IOrder, IOrderItem } from "@/lib/database/models/order.model";
import { getOrdersByEvent } from "@/lib/database/actions/order.actions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";

const Orders = ({ searchParams }: SearchParamProps) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  // const eventId = searchParams?.eventId as string;
  const searchText = (searchParams?.query as string) || "";

  const eventObject = useParams<{ id: string }>();
  const eventId = eventObject?.id as string;

  const getOrders = async () => {
    const orders = await getOrdersByEvent(eventId);
    // const orders = orderData.map()
    setOrders(orders);
  };

  useEffect(() => {
    getOrders();
    // getRelatedEvents();
  }, []);

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Orders</h3>
      </section>

      {/* <section className="wrapper mt-8 w-[30vh]">
        <Search />
      </section> */}

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Event Title
              </th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
            <>
              {orders.map((row) => (
                <tr
                  key={row._id}
                  className="p-regular-14 lg:p-regular-16 border-b "
                  style={{ boxSizing: "border-box" }}
                >
                  <td className="min-w-[250px] py-4 text-primary-500">
                    {row._id}
                  </td>
                  <td className="min-w-[200px] flex-1 py-4 pr-4">
                    {row.event.title}
                  </td>
                  <td className="min-w-[150px] py-4">{row.buyer.firstname}</td>
                  <td className="min-w-[100px] py-4">
                    {formatDateTime(row.event.startDateTime).dateOnly}
                  </td>
                  <td className="min-w-[100px] py-4 text-right">
                    {formatPrice(row.event.price)}
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;
