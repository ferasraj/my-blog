import { Link } from "react-router-dom";
import Images from "../components/Images";
import { twMerge } from "tailwind-merge";

const PostListItem = () => {
  return (
    <article className={twMerge("flex flex-col xl:flex-row gap-8 mb-8")}>
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Images
          src="postImg.jpeg"
          alt="postImg"
          className="rounded-2xl object-cover "
          w="735"
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-2xl sm:text-4xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written By</span>
          <Link className="text-blue-800">Feras Raj</Link>
          <time>on</time>
          <Link className="text-blue-800">Web Design</Link>
          <time> 2 days ago</time>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          voluptas consequuntur officiis debitis fugiat earum velit rem corrupti
          fugit nisi animi omnis aliquam magni, explicabo, eaque eligendi! Non,
          cupiditate. Unde!
        </p>
        <Link to="/test" className="text-blue-800 underline text-sm">
          Read More
        </Link>
      </div>
    </article>
  );
};

export default PostListItem;
