import React from "react";
import Images from "../components/Images";

const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Images
          src="userImg.jpeg"
          w="40"
          //   h="40"
          className="rounded-full w-10 h-10 object-cover"
        />
        <span className=" font-bold  text-blue-500">Feras Raj</span>
        <span className="text-sm text-gray-500">2 Days Ago</span>
      </div>
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
          similique dicta totam ad, cumque deserunt voluptates. Atque eum qui
          illum maxime accusamus molestiae animi? Repellat sed et officia sequi
          facere?
        </p>
      </div>
    </div>
  );
};

export default Comment;
