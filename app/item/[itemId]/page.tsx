import ClientOnly from "@/app/components/ClientOnly";
import Navbar from "@/app/components/Navbar";
import ItemPageClient from "./ItemPageClient";
import EmptyPlace from "@/app/components/EmptyPlace";
import getItemByIdAndMenuItems from "@/app/actions/getItemById";

interface IParams {
  itemId?: string;
}

const FoodItemPage = async ({ params }: { params: IParams }) => {
  const data = await getItemByIdAndMenuItems(params);

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
      />
    </ClientOnly>
  );
};

export default FoodItemPage;
