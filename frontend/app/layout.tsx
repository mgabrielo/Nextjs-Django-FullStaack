import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";
import LoginModal from "./components/modals/LoginModal";
import SignUpModal from "./components/modals/SignUpModal";
import { getUserId } from "./actions/serverActions";
import AddPropertyModal from "./components/modals/AddPropertyModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Django AirBnb",
  description: "created by grey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar userId={userId} />
        <div className="pt-[85px]">{children}</div>
        <LoginModal />
        <SignUpModal />
        <AddPropertyModal />
      </body>
    </html>
  );
}
