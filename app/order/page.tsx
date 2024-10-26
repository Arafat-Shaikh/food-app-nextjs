import React from "react";
import getAllOrders from "../actions/getAllOrders";
import ClientOnly from "../components/ClientOnly";
import OrdersClientPage from "./OrdersClientPage";

const OrdersPage = async () => {
  const orders = await getAllOrders();
  return (
    <ClientOnly>
      <OrdersClientPage orders={orders} />
    </ClientOnly>
  );
};

export default OrdersPage;
