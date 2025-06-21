import { Link, useParams } from "react-router-dom";
import Images from "../components/Images";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
  console.log(data);

  if (isPending) return "Loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found! ";
  return (
    <main className="flex flex-col gap-8 ">
      {/* Details */}
      <div className=" flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8 ">
          <h1 className="text-xl md:text-3xl xl:text-4xl  2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-400 ">
            <span>Written By</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <time>{format(data.createdAt)}</time>
          </div>
          <p className="text-gray-500 font-medium ">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5 h-fit">
            <Images src={data.img} w="600" h="350" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className=" lg:text-lg flex flex-col gap-6 text-justify w-full">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
        {/* menu */}
        <aside className="px-4 h-max sticky top-4">
          <h1 className=" mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Images
                src={data.user.img}
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500 max-w-40 text-justify">
              user dis I will make it after complate the project with user
              controle panel
            </p>
            <div className="flex gap-2">
              <Link>
                <Images src="facebook.svg" />
              </Link>
              <Link>
                <Images src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/posts" className="underline">
              All
            </Link>
            <Link to="/posts?category=web-design" className="underline">
              Web Design
            </Link>
            <Link to="/posts?cat=development" className="underline">
              Development
            </Link>
            <Link to="/posts?cat=databases" className="underline">
              Databases
            </Link>
            <Link to="/posts?cat=seo" className="underline">
              Search Engines
            </Link>
            <Link to="/posts?cat=marketing" className="underline">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </aside>
      </div>
      {/* Comments */}
      <Comments postId={data._id} />
    </main>
  );
};

export default SinglePostPage;
