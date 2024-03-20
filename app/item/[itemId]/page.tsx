import ClientOnly from "@/app/components/ClientOnly";
import Navbar from "@/app/components/Navbar";
import ItemPageClient from "./ItemPageClient";
import EmptyPlace from "@/app/components/EmptyPlace";
import getItemByIdAndMenuItems from "@/app/actions/getItemById";
import { getCartItems } from "@/app/actions/getCartItems";

interface IParams {
  itemId?: string;
}

const FoodItemPage = async ({ params }: { params: IParams }) => {
  const data = await getItemByIdAndMenuItems(params);
  const cartItems = await getCartItems();

  console.log(data?.itemsByRestaurant);

  if (!data?.itemById) {
    return (
      <ClientOnly>
        <EmptyPlace />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Navbar />
      <ItemPageClient
        ItemById={data?.itemById}
        itemByRestaurant={data.itemsByRestaurant}
        cartItems={cartItems}
      />
    </ClientOnly>
  );
};

export default FoodItemPage;
