import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userProvider";

function PostForm() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    console.log("🚀 ~ handleSubmit:", title, content, user);
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("author", user._id);
    formdata.append("logo", image);

    for (const item of formdata.entries()) {
      console.log("🚀 ~ item:", item);
    }

    const response = await axios.post(
      "http://localhost:5000/posts/add",
      formdata
    );
    console.log("🚀 ~ response:", response);
  };

  const handleImageSelect = (e) => {
    setImage(e.currentTarget.files[0]);
    console.log();
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-[20px] mt-[40px] w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <label className="cursor-pointer">
        Add image
        <input
          hidden
          type="file"
          onChange={handleImageSelect}
          accept="image/png, image/jpeg"
        />
      </label>
      <img src={image && URL.createObjectURL(image)} />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;
