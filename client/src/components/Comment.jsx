import { format } from "timeago.js";
import Images from "../components/Images";

const Comment = ({ comment }) => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Images
          src={comment.user.img}
          w="40"
          //   h="40"
          className="rounded-full w-10 h-10 object-cover"
        />
        <span className=" font-bold  text-blue-500">
          {comment.user.username}
        </span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
      </div>
      <div className="mt-4">
        <p>{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
