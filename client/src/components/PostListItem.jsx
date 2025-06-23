import { Link } from "react-router-dom";
import Images from "../components/Images";
import { twMerge } from "tailwind-merge";
import { format } from "timeago.js";

const PostListItem = ({ post, searchTerm = "" }) => {
  const highlightText = (text, term) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };
  return (
    <article className={twMerge("flex flex-col xl:flex-row gap-8 mb-8")}>
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Images
            src={post.img}
            className="rounded-2xl object-cover"
            w="735"
            h="400"
          />
        </div>
      )}

      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <div>
          <Link
            to={`/${post.slug}`}
            className="text-2xl sm:text-4xl font-semibold w-fit"
          >
            {highlightText(post.title, searchTerm)}
          </Link>
          {typeof post.visit === "number" && (
            <span className="text-sm text-gray-500 ml-5">
              ({post.visit} {post.visit <= 1 ? "view" : "views"})
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written By</span>
          <Link
            className="text-blue-800"
            to={`/posts?author=${post.user.username}`}
          >
            {post.user.username}
          </Link>
          <time>on</time>
          <Link className="text-blue-800" to={`/posts?cat=${post.category}`}>
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{highlightText(post.desc, searchTerm)}</p>
        <Link
          to={`/${post.slug}`}
          className="underline text-blue-800 text-sm w-fit"
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default PostListItem;
