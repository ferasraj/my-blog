import React from "react";
import Comment from "./Comment";
import { twMerge } from "tailwind-merge";

const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <div className="flex items-center justify-between gap-8 w-full">
        <textarea
          placeholder="Write a comment..."
          className={twMerge(
            "bg-white w-full rounded-xl  focus:outline-none",
            " p-3 caret-gray-500 resize-none overflow-hidden "
          )}
          // rows=""
        />
        <button className="bg-blue-800 px-4 py-2 text-white rounded-xl font-medium ">
          Send
        </button>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
