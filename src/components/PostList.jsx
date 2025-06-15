import React from "react";
import { twMerge } from "tailwind-merge";
import PostListItem from "./PostListItem";

const PostList = () => {
  return (
    <main className={twMerge("flex flex-col gap-12 mb-8 ")}>
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </main>
  );
};

export default PostList;
