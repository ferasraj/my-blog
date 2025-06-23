import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const PostList = ({ isInfinite = true }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const fetchPosts = async (pageParam) => {
    const searchParamsObj = Object.fromEntries([...searchParams]);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: {
        page: isInfinite ? pageParam : 1,
        limit: isInfinite ? 2 : 1000, // أو خليه فارغ لو تبي كلهم
        ...searchParamsObj,
      },
    });
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString(), isInfinite],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore && isInfinite ? pages.length + 1 : undefined,
  });

  if (status === "loading") return "Loading...";
  if (status === "error")
    return <p>Error: {error?.message || "Something went wrong!"}</p>;

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  if (allPosts.length === 0) return <p>No posts found.</p>;

  return (
    <main className="flex flex-col gap-12 mb-8">
      {isInfinite ? (
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
      ) : (
        allPosts.map((post) => (
          <PostListItem key={post._id} post={post} searchTerm={searchTerm} />
        ))
      )}
    </main>
  );
};

export default PostList;
