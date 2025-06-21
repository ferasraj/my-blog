import { twMerge } from "tailwind-merge";
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  console.log(searchParamsObj);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 2, searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
  console.log(data);

  if (status === "loading") return "Loading...";

  if (status === "error")
    return <p>Error: {error?.message || "Something went wrong!"}</p>;

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  if (allPosts.length === 0) return <p>No posts found.</p>;

  return (
    <main className={twMerge("flex flex-col gap-12 mb-8 ")}>
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more posts...</h4>}
        endMessage={
          <p>
            <b>All posts loaded!</b>
          </p>
        }
      >
        {allPosts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </main>
  );
};

export default PostList;
