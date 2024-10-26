import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  orderId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    NextResponse.error();
  }

  const { orderId } = params;

  if (!orderId || typeof orderId !== "string") {
    throw new Error("Invalid ID");
  }

  const orderExists = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (!orderExists?.id) {
    return new NextResponse("Order doesn't exist", { status: 200 });
  }

  await prisma.order.delete({
    where: {
      id: orderId,
    },
  });

  return NextResponse.json("Order deleted Successfully", { status: 200 });
}
