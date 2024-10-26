import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/app/libs/stripe";

import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { OrderStatus } from "@prisma/client";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const { totalAmount, cartItems, delAddress } = await request.json();

  if (!totalAmount || cartItems.length === 0 || !delAddress) {
    return new NextResponse("Items required", { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  cartItems.forEach((item: any) => {
    line_items.push({
      quantity: item.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: item.food.name,
        },
        unit_amount: item.food.price * 100,
      },
    });
  });

  line_items.push({
    quantity: 1,
    price_data: {
      currency: "USD",
      product_data: {
        name: "Delivery and platform fee charge",
      },
      unit_amount: 4 * 100, // Amount in cents
    },
  });

  const order = await prismadb.order.create({
    data: {
      isPaid: false,
      userId: currentUser.id,
      totalAmount,
      status: OrderStatus.Processing,
      orderItems: {
        create: cartItems.map((item: any) => ({
          FoodListing: {
            connect: {
              id: item.food.id,
            },
          },
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderItems: {
        include: {
          FoodListing: true,
        },
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_URL}/cart?success=${order.id}`,
    cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=${order.id}`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
