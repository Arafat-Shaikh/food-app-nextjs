import ClientOnly from "../components/ClientOnly";
import AdminRestaurantClient from "./AdminRestaurantClient";

const AdminRestaurantPage = () => {
  return (
    <ClientOnly>
      <AdminRestaurantClient />
    </ClientOnly>
  );
};

export default AdminRestaurantPage;
