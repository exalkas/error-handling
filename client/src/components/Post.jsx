import { useContext, useState } from "react";
import { UserContext } from "../context/userProvider";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import axios from "axios";
import CommentAdd from "./CommentAdd";
import Comment from "./Comment";
import Spinner from "./Spinner";

export default function Post({
  data = {
    _id: "",
    title: "",
    author: {
      username: "",
    },
    content: "",
    image: "",
    likes: [],
    comments: [],
  },
}) {
  console.log("🚀 ~ data:", data);

  const [showSpinner, setShowSpinner] = useState(false);

  const { user, posts, setPosts } = useContext(UserContext);
  const handleLike = async () => {
    setShowSpinner(true);
    const response = await axios.put("http://localhost:5000/posts/like", {
      postID: data._id,
      userID: user._id,
    });
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      const oldPosts = [...posts];

      const id = oldPosts.findIndex((item) => item._id === data._id);

      oldPosts[id].likes = [...response.data.post.likes];
      setPosts(oldPosts);
    }
    setShowSpinner(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] w-[400px] border-white border-2 rounded-md p-4">
      <h3>{data.title}</h3>
      <p>{data.author.username}</p>
      <hr className="text-white w-full" />
      <p>{data.content}</p>
      {data.image ? <img src={data.image} /> : null}
      <hr />
      <p>
        {data.likes.includes(user._id) ? (
          showSpinner ? (
            <Spinner />
          ) : (
            <FaHeart
              className="text-red-500 text-xl cursor-pointer"
              onClick={handleLike}
            />
          )
        ) : (
          <FaRegHeart
            className="text-red-500 text-xl cursor-pointer"
            onClick={handleLike}
          />
        )}
      </p>
      <hr className="w-full text-white" />
      {data.comments.map((item) => (
        <Comment key={item._id} data={item} postID={data._id} />
      ))}

      <CommentAdd postID={data._id} userID={user._id} />
    </div>
  );
}
