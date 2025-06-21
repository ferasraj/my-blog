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
// import { Editor } from "primereact/editor";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex flex-col gap-3">
        <p className="font-medium">
          Want to post your story?
          <Link
            to="/register"
            className="underline text-blue-600 hover:text-blue-800"
          >
            Sign up
          </Link>
          or
          <Link
            to="/login"
            className="underline text-blue-600 hover:text-blue-800"
          >
            Log in
          </Link>{" "}
          to leave a comment.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 ">
      <h1 className="text-xl font-light">Creat a New Post </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="cursor-pointer p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            Add a cover image
          </button>
        </Upload>

        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a :
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md focus:outline-none"
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
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2 justify-center text-xl ">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌆
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>{" "}
          </div>
          {/* <Editor
            className="flex-1 py-2 rounded-xl bg-white shadow-md"
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
            style={{ height: "320px" }}
            placeholder="text your story here"
          /> */}
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md h-[calc(100%+10px)] mb-14 "
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
            placeholder="Text Your Story Here "
          />
        </div>
        <div className="progress-div flex gap-4 items-center ml-10">
          {progress > 0 && (
            <div className="w-1/2 flex-row bg-gray-200 rounded-full h-3 overflow-hidden ">
              <div
                className="bg-blue-600 h-full transition-all duration-300 ease-in-out "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <p className="text-sm text-gray-600 mt-1 overflow-hidden font-bold">
            {progress}%
          </p>
        </div>

        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className={twMerge(
            "bg-blue-800 text-white font-medium rounded-xl mt-2 p-2 w-36",
            " disabled:bg-blue-400 disabled:cursor-not-allowed mb-10 cursor-pointer ml-8"
          )}
        >
          {mutation.isPending ? "Loading..." : "Send"}
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
