import { Inter } from "next/font/google";
import "@/assets/globals.css";
import "photoswipe/dist/photoswipe.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/contexts/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nestio",
  description: "Find Property Rentals",
};

export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main className={inter.className}>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
}
