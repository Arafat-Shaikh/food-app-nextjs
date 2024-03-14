import Image from "next/image";
import Container from "../components/Container";
import Navbar from "../components/Navbar";

const food = {
  name: "Classic Margherita Pizza",
  image: "https://cdn.dummyjson.com/recipe-images/1.webp",
  rating: 4.6,
  reviewCount: 3,
  price: 10.99,
  address: "123 Main St, Cityville, USA",
  restaurantName: "Pizza Paradise",
};

const AdminRestaurantClient = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="bg-neutral-50 h-full">
          <div className="p-6 ">
            <div className="flex gap-4 items-start ">
              <div className="relative h-32 w-32 flex-shrink-0">
                <Image
                  src={food.image}
                  alt=""
                  className="absolute rounded"
                  fill
                />
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <h1 className="text-xl font-bold text-neutral-800">
                    {food.restaurantName}
                  </h1>
                </div>
                <div>hii</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminRestaurantClient;
