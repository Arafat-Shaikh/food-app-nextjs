import { getCartItems } from "../actions/getCartItems";
import getUserAddress from "../actions/getUserAddress";
import ClientOnly from "../components/ClientOnly";
import Navbar from "../components/Navbar";
import CartClientPage from "./CartClientPage";

const CartPage = async () => {
  const cartItems = await getCartItems();
  const userAddress = await getUserAddress();

  return (
    <ClientOnly>
      <CartClientPage userAddress={userAddress} cartItems={cartItems} />
    </ClientOnly>
  );
};

export default CartPage;
