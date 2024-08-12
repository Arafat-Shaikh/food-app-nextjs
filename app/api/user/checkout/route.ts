import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/app/libs/stripe";

import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

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

  const order = await prismadb.order.create({
    data: {
      isPaid: false,
      userId: currentUser.id,
      orderItems: {
        create: cartItems.map((item: any) => ({
          FoodListing: {
            connect: {
              id: item.food.id,
            },
          },
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
    success_url: `http://localhost:3000/cart?success=1`,
    cancel_url: `http://localhost:3000/cart?canceled=${order.id}`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
