import prisma from "@/app/libs/prismadb";

interface IParams {
  itemId?: string;
}

export default async function getItemByIdAndMenuItems(params: IParams) {
  try {
    const { itemId } = params;

    const itemById = await prisma.foodListing.findUnique({
      where: {
        id: itemId,
      },
    });

    const itemsByRestaurant = await prisma.foodListing.findMany({
      where: {
        restaurantName: itemById?.restaurantName,
        NOT: {
          id: itemById?.id,
        },
      },
    });

    console.log(itemsByRestaurant);

    if (!itemById) {
      return null;
    }

    return { itemById, itemsByRestaurant };
  } catch (error: any) {
    throw new Error(error);
  }
}
