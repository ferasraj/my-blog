import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Homepage = () => {
  return (
    <main className={twMerge("mt-4 flex flex-col gap-4")}>
      {/* BREADCRUMB */}
      <nav aria-label="BREADCRUMB">
        <ol className={twMerge("flex gap-4")}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className={twMerge("flex items-center gap-4")}>
            <span className={twMerge("text-black -ml-3 mt-0.5 -mr-3")}>
              <ChevronRight size={20} strokeWidth={1} />
            </span>
            <span className={twMerge("text-blue-800")} aria-current="page">
              Blogs and Article
            </span>
          </li>
        </ol>
      </nav>
      {/* INTRODUCTION */}
      <div className={twMerge("flex items-center justify-between")}>
        {/* titles */}
        <section>
          <h1
            className={twMerge(
              "text-2xl md:text-4xl font-bold lg:text-5xl text-gray-800"
            )}
          >
            How a Powerful Website Boosts Your Business and Engages Customers
          </h1>
          <p className={twMerge("mt-8 text-md md:text-xl")}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            tempora libero,
          </p>
        </section>
        {/* Animated btn */}
        <Link to="write" className={twMerge("hidden md:block relative")}>
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton"
            // className="text-lg tracking-widest"
            aria-hidden="true"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button
            className={twMerge(
              "absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center"
            )}
            aria-label="اكتب قصتك أو شارك فكرتك"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* FEATURED POSTS */}
      <section>//not complate yet</section>
      {/* POST LIST */}
      <section>//not complate yet</section>
    </main>
  );
};

export default Homepage;
