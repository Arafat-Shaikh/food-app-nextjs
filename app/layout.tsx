import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import { Toaster } from "react-hot-toast";
import UserAddressModal from "./components/UserAddressModal";
import Navbar from "./components/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import AuthProvider from "./libs/AuthProvider";

export const metadata: Metadata = {
  title: "NextEat",
  description: "Order food now",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  Session,
}: Readonly<{
  children: React.ReactNode;
  Session: any;
}>) {
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  return (
    <html lang="en">
      <AuthProvider session={Session}>
        <body className={font.className}>
          <ClientOnly>
            <Toaster position="bottom-center" />
            <UserAddressModal />
            <LoginModal />
            <SignupModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
