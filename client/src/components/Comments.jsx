import axios from "axios";
import Comment from "./Comment";
import { twMerge } from "tailwind-merge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; // تأكد أنك مستورد Link

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      desc: formData.get("desc"),
    };

    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>

      {/* ✅ حالة المستخدم غير مسجل */}
      {!user ? (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex flex-col gap-3">
          <p className="font-medium">
            Want to join the conversation?{" "}
            <Link
              to="/register"
              className="underline text-blue-600 hover:text-blue-800"
            >
              Sign up
            </Link>{" "}
            or{" "}
            <Link
              to="/login"
              className="underline text-blue-600 hover:text-blue-800"
            >
              Log in
            </Link>{" "}
            to leave a comment.
          </p>
        </div>
      ) : (
        // ✅ المستخدم مسجل، اظهر له الفورم
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-8 w-full"
        >
          <textarea
            name="desc"
            placeholder="Write a comment..."
            className={twMerge(
              "bg-white w-full rounded-xl  focus:outline-none",
              " p-3 caret-gray-500 resize-none overflow-hidden "
            )}
          />
          <button className="cursor-pointer bg-blue-800 px-4 py-2 text-white rounded-xl font-medium ">
            Send
          </button>
        </form>
      )}

      {/* ✅ التعليقات دايمًا تظهر للجميع */}
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Error loading comments!"
      ) : (
        <>
          {mutation.isPending && user && (
            <Comment
              comment={{
                desc: `${mutation.variables.desc} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  username: user.username,
                },
              }}
            />
          )}
          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
