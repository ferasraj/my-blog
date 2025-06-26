import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

const DeletePostButton = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);

  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const isOwner = user?.username === post.user.username;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(
        [
          "posts" /* هنا لازم تمرر نفس القيم اللي تستخدمها في useInfiniteQuery */,
        ],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.filter((p) => p._id !== post._id),
            })),
          };
        }
      );

      // تحديث كاش الفيتشرز
      queryClient.setQueryData(["featuredPosts"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          posts: oldData.posts.filter((p) => p._id !== post._id),
        };
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data || "Error deleting post");
    },
  });

  if (!user || (!isOwner && !isAdmin)) return null;

  const confirmDelete = () => {
    setShowConfirm(false);
    deleteMutation.mutate();
  };

  return (
    <>
      <div
        className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        <div className="flex items-center gap-1 text-red-600">
          <Trash2 size={18} strokeWidth={1.5} /> <span>Delete</span>
        </div>
        {deleteMutation.isPending && (
          <span className="text-xs">(in progress)</span>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Are you sure?"
          message="Are you sure you want to delete this post? This action cannot be undone."
          onCancel={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default DeletePostButton;
