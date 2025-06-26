import { format } from "timeago.js";
import Images from "./Images";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const fetchPostById = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/find/${postId}`
  );
  return res.data;
};

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const { data: postData } = useQuery({
    queryKey: ["postOwner", postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId,
  });

  const isAuthor = postData?.user?.clerkUserId === user?.id;
  const isCommentAuthor = comment.user.username === user?.username;
  const isAdmin = role === "admin";

  const canDelete = isAdmin || isCommentAuthor || isAuthor;

  // 🟡 حالة التعديل
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.desc);

  // ✅ حذف تعليق
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  // ✅ تعديل تعليق
  const editMutation = useMutation({
    mutationFn: async (newDesc) => {
      const token = await getToken();
      return axios.put(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        { desc: newDesc },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment updated");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Images
            src={comment.user.img}
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user && canDelete && (
          <>
            <span
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer ml-2 hover:underline"
              onClick={() => deleteMutation.mutate()}
            >
              delete
              {deleteMutation.isPending && <span> (in progress)</span>}
            </span>
            {isCommentAuthor && !isEditing && (
              <span
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-300 hover:text-blue-500 hover:underline cursor-pointer ml-2"
              >
                edit
              </span>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        {isEditing ? (
          <>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 rounded-xl border border-gray-300"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => editMutation.mutate(editedText)}
                className="text-sm text-green-600 cursor-pointer hover:underline"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedText(comment.desc);
                }}
                className="text-sm text-gray-500 cursor-pointer hover:underline"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p>{comment.desc}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
