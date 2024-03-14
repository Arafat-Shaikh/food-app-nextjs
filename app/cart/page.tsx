import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/Navbar";
import CartClientPage from "./CartClientPage";

const CartPage = () => {
  return (
    <ClientOnly>
      <CartClientPage />
    </ClientOnly>
  );
};

export default CartPage;
