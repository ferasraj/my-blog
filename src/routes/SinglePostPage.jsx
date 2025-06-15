import { Link } from "react-router-dom";
import Images from "../components/Images";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comment from "../components/Comment";
import Comments from "../components/Comments";

const SinglePostPage = () => {
  return (
    <main className="flex flex-col gap-8 ">
      {/* Details */}
      <div className=" flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl  2xl:text-5xl font-semibold">
            Lorem ipsum dolor sit, amet consectetur adipisicing Lorem ipsum
            dolor sit, ametsicing
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Written By</span>
            <Link className="text-blue-800">Feras Raj</Link>
            <span>on</span>
            <Link className="text-blue-800">Web Design</Link>
            <time> 2 days ago</time>
          </div>
          <p className="text-gray-500 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quam
            sint ea nulla alias, est perferendis, sapiente architecto sed
            veritatis ab minus dignissimos esse eum amet, cupiditate earum. Ab,
            aspernatur.
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Images src="R.jpeg" w="600" className="rounded-2xl" />
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* text */}
        <div className=" lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
            possimus laboriosam voluptatem dolores iure amet ipsa dolorum
            distinctio! Similique facilis saepe officia explicabo eligendi ex
            sint sit iste architecto impedit? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Veniam possimus laboriosam voluptatem
            dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
            officia explicabo eligendi ex sint sit iste architecto impedit?
          </p>
        </div>
        {/* menu */}
        <aside className="px-4 h-max sticky top-8">
          <h1 className=" mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <Images
                src="userImg.jpeg"
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />
              <Link className="text-blue-800">Feras Raj</Link>
            </div>
            <p className="text-sm text-gray-500">
              dolores iure amet ipsa dolorum distinctio! Similique facilis saepe
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
          <PostMenuActions />
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
      <Comments />
    </main>
  );
};

export default SinglePostPage;
