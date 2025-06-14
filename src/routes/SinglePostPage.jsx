import { useParams } from "react-router-dom";

const posts = [
  { slug: "learn-react", title: "تعلم React", content: "محتوى..." },
  { slug: "js-tips", title: "نصائح جافاسكربت", content: "محتوى..." },
];

const SinglePostPage = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <div>المقالة غير موجودة</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default SinglePostPage;
