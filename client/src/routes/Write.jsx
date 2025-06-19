import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import { Editor } from "primereact/editor";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);

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
    return <div className="">You should login!</div>;
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
    mutation.mutate(data, {});
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 ">
      <h1 className="text-xl font-light">Creat a New Post </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            Add a cover image
          </button>
        </Upload>
        <div className="progress-div flex gap-4 items-center">
          {progress > 0 && (
            <div className="w-1/2 flex-row bg-gray-200 rounded-full h-3 overflow-hidden ">
              <div
                className="bg-blue-600 h-full transition-all duration-300 ease-in-out "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <p className="text-sm text-gray-600 mt-1 overflow-hidden">
            {progress}%
          </p>{" "}
        </div>

        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category:
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
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image">🌆</Upload>
            <Upload type="video">▶️</Upload>
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
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className={twMerge(
            "bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36",
            " disabled:bg-blue-400 disabled:cursor-not-allowed mb-10 cursor-pointer"
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
