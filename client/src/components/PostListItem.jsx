import { Link } from "react-router-dom";
import Images from "../components/Images";
import { twMerge } from "tailwind-merge";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
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
        <Link
          to={`/${post.slug}`}
          className="text-2xl sm:text-4xl font-semibold w-fit"
        >
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written By</span>
          <Link
            className="text-blue-800"
            to={`/posts?author=${post.user.username}`}
          >
            {post.user.username}
          </Link>
          <time>on</time>
          <Link className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
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
