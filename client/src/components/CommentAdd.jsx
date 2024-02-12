import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userProvider";

function CommentAdd({ postID = "", userID = "" }) {
  const [comment, setComment] = useState("");

  const { posts, setPosts } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/comments/add",
      { comment, postID, userID }
    );
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      const oldPosts = [...posts]; // create a copy of the current posts

      const id = oldPosts.findIndex((item) => item._id === postID); // find the post to edit

      oldPosts[id].comments = [...response.data.post.comments]; // REPLACE the current comments array with the UPDATED POST comments array
      setPosts(oldPosts); // update the posts in the context
    }
  };

  return (
    <form className="mt-[2rem] w-full" onSubmit={handleSubmit}>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <textarea
          id="chat"
          rows="1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="resize-none block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
}

export default CommentAdd;
