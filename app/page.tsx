import getCurrentUser from "./actions/getCurrentUser";
import getFoodListing from "./actions/getFoodListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import HomeClient from "./components/HomeClient";
import Navbar from "./components/Navbar";

const HomePage = async () => {
  const currentUser = await getCurrentUser();
  const foodList = await getFoodListing();

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
      <Container>
        <HomeClient foodList={foodList} />
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
