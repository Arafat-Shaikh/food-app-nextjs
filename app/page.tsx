import getCurrentUser from "./actions/getCurrentUser";
import getFoodListing, { IFoodListingParams } from "./actions/getFoodListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import HomeClient from "./components/HomeClient";
import Navbar from "./components/Navbar";

interface HomeProps {
  searchParams: IFoodListingParams;
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const { foodList, foodListLength } = await getFoodListing(searchParams);
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  return (
    <ClientOnly>
      <Container>
        <HomeClient foodList={foodList} foodListLength={foodListLength} />
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
