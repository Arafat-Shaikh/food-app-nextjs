import ClientOnly from "@/app/components/ClientOnly";
import ItemPageClient from "./ItemPageClient";
import getItemByIdAndMenuItems from "@/app/actions/getItemById";
import { getCartItems } from "@/app/actions/getCartItems";
import EmptyPage from "@/app/components/EmptyPage";

interface IParams {
  itemId?: string;
}

const FoodItemPage = async ({ params }: { params: IParams }) => {
  const data = await getItemByIdAndMenuItems(params);
  const cartItems = await getCartItems();

  if (!data?.itemById) {
    return (
      <ClientOnly>
        <EmptyPage heading="Item not found" subHeading="" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ItemPageClient
        ItemById={data?.itemById}
        itemByRestaurant={data.itemsByRestaurant}
        cartItems={cartItems}
      />
    </ClientOnly>
  );
};

export default FoodItemPage;
