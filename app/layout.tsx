import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <LoginModal />
          <SignupModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
