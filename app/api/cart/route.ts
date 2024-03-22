import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { itemId: selectedFoodId } = body;

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      userId: currentUser.id,
      foodId: selectedFoodId,
    },
  });

  if (existingCartItem) {
    await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
  } else {
    const cartItem = await prisma.cartItem.create({
      data: {
        userId: currentUser.id,
        foodId: selectedFoodId,
        quantity: 1,
      },
    });
  }

  return NextResponse.json("added");
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const item = await request.json();

  console.log(item);

  const existingItem = await prisma.cartItem.findFirst({
    where: { id: item.id, foodId: item.foodId },
  });

  if (existingItem) {
    if (item.quantity <= 0) {
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          userId: currentUser.id,
          foodId: existingItem.foodId,
          quantity: item.quantity,
        },
      });
    }
  }

  return NextResponse.json("hii");
}
