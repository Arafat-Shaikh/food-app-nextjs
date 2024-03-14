import ClientOnly from "@/app/components/ClientOnly";
import Navbar from "@/app/components/Navbar";
import ItemPageClient from "./ItemPageClient";

const itemPage = () => {
  return (
    <ClientOnly>
      <Navbar />
      <ItemPageClient />
    </ClientOnly>
  );
};

export default itemPage;
