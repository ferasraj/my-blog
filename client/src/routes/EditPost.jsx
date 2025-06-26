import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Write from "./Write";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const EditPost = () => {
  const { slug } = useParams();

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post.</div>;

  return <Write isEdit={true} defaultData={post} />;
};

export default EditPost;
