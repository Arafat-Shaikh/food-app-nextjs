import getFoodListing, { IFoodListingParams } from "./actions/getFoodListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import HomeClient from "./components/HomeClient";

interface HomeProps {
  searchParams: IFoodListingParams;
}
export const dynamic = "force-dynamic";
const HomePage = async ({ searchParams }: HomeProps) => {
  const { foodList, foodListLength } = await getFoodListing(searchParams);

  return (
    <ClientOnly>
      <Container>
        <HomeClient foodList={foodList} foodListLength={foodListLength} />
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
