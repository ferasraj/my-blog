import { twMerge } from "tailwind-merge";
import Images from "../components/Images";
import { Link } from "react-router-dom";

const FeaturedPosts = () => {
  return (
    <main className={twMerge("mt-8 flex flex-col lg:flex-row gap-8")}>
      {/* FIRST*/}
      <article className={twMerge("w-full lg:w-1/2 flex flex-col gap-4")}>
        {/* image */}
        <Images
          src="featured1.jpeg"
          alt="featured1"
          className="rounded-3xl object-cover"
          w="895"
        />
        {/* details */}
        <section className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">Web Design </Link>
          <time className="text-gray-500">2 Days Later</time>
        </section>
        {/* title */}
        <Link
          to="/test"
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </Link>
      </article>
      {/* OTHERS*/}
      <div className={twMerge("w-full lg:w-1/2 flex flex-col gap-4")}>
        {/* Second */}
        <article className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Images
              src="featured2.jpeg"
              alt="featured1"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <section className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">01.</h1>
              <Link className="text-blue-800 ">Web Design </Link>
              <time className="text-gray-500 text-sm">2 Days Later</time>
            </section>
            {/* title */}
            <Link
              to="/test"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Link>
          </div>
        </article>
        {/* Third */}
        <article className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Images
              src="featured3.jpeg"
              alt="featured1"
              className="rounded-3xl object-cover w-full h-full "
              w="298"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <section className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">01.</h1>
              <Link className="text-blue-800 ">Web Design </Link>
              <time className="text-gray-500 text-sm">2 Days Later</time>
            </section>
            {/* title */}
            <Link
              to="/test"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Link>
          </div>
        </article>
        {/* Fourth */}
        <article className="lg:h-1/3 flex justify-between gap-4">
          <div className="w-1/3 aspect-video">
            <Images
              src="featured4.jpeg"
              alt="featured1"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <section className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">01.</h1>
              <Link className="text-blue-800 ">Web Design </Link>
              <time className="text-gray-500 text-sm">2 Days Later</time>
            </section>
            {/* title */}
            <Link
              to="/test"
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
};

export default FeaturedPosts;
