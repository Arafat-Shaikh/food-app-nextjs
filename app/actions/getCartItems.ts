import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getCartItems() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        food: true,
      },
    });

    return cartItems;
  } catch (error: any) {
    throw new Error(error);
  }
}
