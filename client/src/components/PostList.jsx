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
        limit: isInfinite ? 3 : 1000, // أو خليه فارغ لو تبي كلهم
        ...searchParamsObj,
      },
    });
    return res.data;
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString(), isInfinite],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log("📦 lastPage:", lastPage);
      console.log("📄 all pages so far:", pages);

      if (lastPage.posts.length === 0) {
        console.log("⛔ No more posts in current filter (ex: category)!");
        return undefined;
      }

      if (!lastPage.hasMore) {
        console.log("✅ No more pages to fetch");
        return undefined;
      }

      const nextPage = pages.length + 1;
      console.log("➡️ Fetching next page:", nextPage);
      return nextPage;
    },
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
