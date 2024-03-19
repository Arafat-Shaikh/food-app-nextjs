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
  console.log("below is the id");
  console.log(selectedFoodId);

  const cartItem = await prisma.cartItem.create({
    data: {
      userId: currentUser.id,
      foodId: selectedFoodId,
      quantity: 1,
    },
  });

  return NextResponse.json("added");
}
