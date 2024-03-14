import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import HomeClient from "./components/HomeClient";
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <ClientOnly>
      <Navbar />
      <Container>
        <HomeClient />
      </Container>
    </ClientOnly>
  );
};

export default HomePage;
