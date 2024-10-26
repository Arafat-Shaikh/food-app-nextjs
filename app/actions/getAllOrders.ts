import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getAllOrders() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      orderItems: {
        include: {
          FoodListing: true,
        },
      },
    },
  });

  return orders;
}
