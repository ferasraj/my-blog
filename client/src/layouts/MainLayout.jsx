import { twMerge } from "tailwind-merge";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <main className={twMerge("px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64")}>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
