import { getCartItems } from "../actions/getCartItems";
import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/Navbar";
import CartClientPage from "./CartClientPage";

const CartPage = async () => {
  const cartItems = await getCartItems();

  return (
    <ClientOnly>
      <CartClientPage cartItems={cartItems} />
    </ClientOnly>
  );
};

export default CartPage;
