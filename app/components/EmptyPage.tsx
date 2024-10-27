import { ArrowRight, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmptyPageProps {
  heading: string;
  subHeading: string;
}

const EmptyPage = ({ heading, subHeading }: EmptyPageProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
          <ShoppingCart className="w-8 h-8 text-primary" />
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">{heading}</h1>
        <p className="mb-8 text-gray-600">{subHeading}</p>
        <button
          onClick={() => router.push("/")}
          className="bg-black text-white px-3 py-2 rounded-md inline-flex items-center transition-transform duration-200 ease-in-out hover:translate-x-1"
        >
          Go back
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default EmptyPage;
