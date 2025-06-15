import { twMerge } from "tailwind-merge";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div className={twMerge("px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64")}>
      <ScrollToTop />

      {/* NAVBAR */}
      <Navbar />
      {/* BREADCRUMB */}
      {/* INTRODUCTION */}
      {/* FEATURED POSTS */}
      {/* POST LIST */}
    </div>
  );
};

export default App;
