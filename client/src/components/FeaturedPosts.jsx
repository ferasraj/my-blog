import { twMerge } from "tailwind-merge";
import Images from "../components/Images";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
    // refetchInterval: 30000,
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (
    <main className={twMerge("mt-8 flex flex-col lg:flex-row gap-8")}>
      {/* FIRST*/}
      <article className={twMerge("w-full lg:w-1/2 flex flex-col gap-4")}>
        {/* image */}
        {posts[0].img && (
          <Images
            src={posts[0].img}
            updatedAt={posts[0].updatedAt}
            className="rounded-3xl object-cover"
            w="895"
            h="550"
          />
        )}
        {/* details */}
        <section className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link
            className="text-blue-800 lg:text-lg"
            to={`/posts?cat=${posts[0].category}`}
          >
            {posts[0].category}
          </Link>
          <time className="text-gray-500">{format(posts[0].createdAt)}</time>
        </section>
        {/* title */}
        <Link
          to={posts[0].slug}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          {posts[0].title}{" "}
        </Link>
      </article>
      {/* OTHERS*/}
      <div className={twMerge("w-full lg:w-1/2 flex flex-col gap-4")}>
        {/* Second */}
        {posts[1] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[1].img && (
              <div className="w-1/3 aspect-video">
                <Images
                  src={posts[1].img}
                  updatedAt={posts[1].updatedAt}
                  className="rounded-3xl object-cover w-full h-full"
                  w="298"
                />
              </div>
            )}
            {/* details and title */}
            <div className="w-2/3">
              {/* details */}
              <section className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">02.</h1>
                <Link
                  className="text-blue-800 "
                  to={`/posts?cat=${posts[1].category}`}
                >
                  {posts[1].category}
                </Link>
                <time className="text-gray-500 text-sm">
                  {format(posts[1].createdAt)}
                </time>
              </section>
              {/* title */}
              <Link
                to={posts[1].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[1].title}{" "}
              </Link>
            </div>
          </div>
        )}
        {/* Third */}
        {posts[2] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[2].img && (
              <div className="w-1/3 aspect-video">
                <Images
                  src={posts[2].img}
                  updatedAt={posts[2].updatedAt}
                  className="rounded-3xl object-cover w-full h-full"
                  w="298"
                />
              </div>
            )}
            {/* details and title */}
            <div className="w-2/3">
              {/* details */}
              <section className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">03.</h1>
                <Link
                  className="text-blue-800 "
                  to={`/posts?cat=${posts[2].category}`}
                >
                  {posts[2].category}
                </Link>
                <time className="text-gray-500 text-sm">
                  {format(posts[2].createdAt)}
                </time>
              </section>
              {/* title */}
              <Link
                to={posts[2].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[2].title}{" "}
              </Link>
            </div>
          </div>
        )}
        {/* Fourth */}
        {posts[3] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            {posts[3].img && (
              <div className="w-1/3 aspect-video">
                <Images
                  src={posts[3].img}
                  updatedAt={posts[3].updatedAt}
                  className="rounded-3xl object-cover w-full h-full"
                  w="298"
                />
              </div>
            )}
            {/* details and title */}
            <div className="w-2/3">
              {/* details */}
              <section className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">04.</h1>
                <Link
                  className="text-blue-800 "
                  to={`/posts?cat=${posts[3].category}`}
                >
                  {posts[3].category}
                </Link>
                <time className="text-gray-500 text-sm">
                  {format(posts[3].createdAt)}
                </time>
              </section>
              {/* title */}
              <Link
                to={posts[3].slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
              >
                {posts[3].title}{" "}
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default FeaturedPosts;
