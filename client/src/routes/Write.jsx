import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"; // تأكد تضيف هذا

const Write = ({ isEdit = false, defaultData = {} }) => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState(defaultData.content || "");
  const [cover, setCover] = useState(
    defaultData.img ? { url: defaultData.img } : {}
  );

  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState(defaultData.title || "");
  const [desc, setDesc] = useState(defaultData.desc || "");
  const [category, setCategory] = useState(defaultData.category || "general");
  const [isUploading, setIsUploading] = useState(false);

  //!
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    if (img?.url) {
      console.log("🖼️ Adding image:", img.url);
      setValue((prev) => prev + `<p><img src="${img.url}" /></p>`);
      setImg(null); // reset بعد الإضافة
    }
  }, [img]);

  useEffect(() => {
    if (video?.url) {
      console.log("🎥 Adding video:", video.url);
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
      setVideo(null); // reset بعد الإضافة
    }
  }, [video]);
  useEffect(() => {
    console.log("📝 Updated content:", value);
  }, [value]);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const queryClient = useQueryClient(); // داخل الكومبوننت

  const mutation = useMutation({
    mutationFn: async (postData) => {
      const token = await getToken();
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/posts/${defaultData._id}`
        : `${import.meta.env.VITE_API_URL}/posts`;
      const method = isEdit ? axios.patch : axios.post;

      return method(url, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success(isEdit ? "Post updated" : "Post created");
      queryClient.setQueryData(["post", res.data.slug], res.data);
      queryClient.setQueryData(["featuredPosts"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          posts: oldData.posts.map((p) =>
            p._id === res.data._id ? res.data : p
          ),
        };
      });

      queryClient.setQueryData(["posts", "", true], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((p) =>
              p._id === res.data._id ? res.data : p
            ),
          })),
        };
      });

      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) return <div>Loading...</div>;

  if (isLoaded && !isSignedIn) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex flex-col gap-3">
        <p className="font-medium">
          Want to post your story?
          <Link to="/register" className="underline text-blue-600">
            Sign up
          </Link>{" "}
          or
          <Link to="/login" className="underline text-blue-600">
            Log in
          </Link>{" "}
          to post.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      desc,
      content: value,
      category,
      img: cover.url || "",
    };
    console.log("📤 Data to send:", data); // <-- هنا نشوف إذا img فاضي أو لا

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">
        {isEdit ? "Edit your Post" : "Create a New Post"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <div>
          <div className="flex items-center gap-4">
            <Upload
              type="image"
              setProgress={setProgress}
              setData={setCover}
              setIsUploading={setIsUploading}
            >
              <button
                type="button"
                className="cursor-pointer p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
              >
                {cover?.url ? "Change Image" : "Add a Cover Image"}
              </button>
            </Upload>

            {cover?.url && (
              <div className="relative w-20 h-14">
                <img
                  src={cover.url}
                  alt="cover"
                  className="w-full h-full object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => setCover({})}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  title="Remove cover"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a :</label>
          <select
            name="category"
            className="p-2 rounded-xl bg-white shadow-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="px-4 py-2 rounded-xl bg-white shadow-md ml-8 h-full"
          name="desc"
          placeholder="A Short Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2 justify-center text-xl ">
            <Upload
              type="image"
              setProgress={setProgress}
              setIsUploading={setIsUploading}
              setData={(res) => setImg({ url: res.url })} // ✅ هنا نتعامل مع الكومبوننت فقط
            >
              🌆
            </Upload>
            <Upload
              type="video"
              setProgress={setProgress}
              setIsUploading={setIsUploading}
              setData={(res) => setVideo({ url: res.url })} // ✅ نفس الشي
            >
              ▶️
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md h-[calc(100%+10px)] mb-14 max-w-[calc(100%-29px)]"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
            placeholder="Text Your Story Here"
          />
        </div>
        <div className="progress-div flex gap-4 items-center ml-10">
          {progress > 0 && (
            <div className="w-1/2 flex-row bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <p className="text-sm text-gray-600 mt-1 overflow-hidden font-bold">
            {progress}%
          </p>
        </div>
        <button
          disabled={
            mutation.isPending ||
            isUploading || // ⛔ يمنع الضغط لو في رفع شغال
            (0 < progress && progress < 100)
          }
          className={twMerge(
            "bg-blue-800 text-white font-medium rounded-xl mt-2 p-2 w-36",
            "disabled:bg-blue-400 disabled:cursor-not-allowed mb-10 cursor-pointer ml-8"
          )}
        >
          {mutation.isPending ? "Loading..." : isEdit ? "Update" : "Create"}
        </button>
        {mutation.isError && (
          <span className="text-red-500">
            {mutation.error.response?.data?.message || "حدث خطأ أثناء الإرسال"}
          </span>
        )}
      </form>
    </div>
  );
};

export default Write;
