"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import Container from "../components/Container";
import { format } from "date-fns";

const OrdersClientPage = ({ orders }: any) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-gray-50 h-full">
      <div className="container mx-auto px-4 py-8">
        <Container>
          <h1 className="text-2xl font-bold mb-6">Order History</h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex-1">
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {format(order.createdAt.toString(), "dd/MM/yy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
                {expandedOrder === order.id && (
                  <div
                    className={`order-details-enter ${
                      expandedOrder === order.id
                        ? "order-details-enter-active"
                        : ""
                    }`}
                  >
                    <div className="p-4 bg-gray-50">
                      <h3 className="font-semibold mb-2">Order Details</h3>
                      <ul className="space-y-2">
                        {order.orderItems.map((item: any, index: number) => (
                          <li key={index} className="flex justify-between">
                            <span>{item.FoodListing.name}</span>
                            <div className="flex flex-row gap-x-2">
                              <span>${item.FoodListing.price.toFixed(2)}</span>
                              <span className="text-gray-600">
                                x{item.quantity}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* <div className="mt-6 text-center">
        <Button variant="outline">Load More Orders</Button>
      </div> */}
        </Container>
      </div>
    </div>
  );
};

export default OrdersClientPage;
