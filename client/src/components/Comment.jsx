import { GoKebabHorizontal } from "react-icons/go";
import { useContext, useState } from "react";
import Popover from "@mui/material/Popover";
import axios from "axios";
import { UserContext } from "../context/userProvider";

function Comment({
  data = {
    text: "",
    commenter: {
      username: "",
    },
    _id: "",
  },
  postID = "",
}) {
  const { posts, setPosts } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDelete = async () => {
    const response = await axios.delete(
      import.meta.env.VITE_BASE_URL + "/comments/delete",
      {
        data: { postID, commentID: data._id },
        headers: {
          "Content-Type": "application/json",
        },
      }
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
    <>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 w-full">
        <textarea
          id="chat"
          rows="1"
          disabled
          className="block resize-none mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={data.text}
        ></textarea>
        <div className="grow flex justify-end">
          <button className="cursor-pointer">
            <GoKebabHorizontal
              onClick={(e) => setAnchorEl(e.currentTarget)}
              className="text-slate-500"
            />
            <Popover
              // id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <p className="p-4 cursor-pointer hover:bg-slate-400">
                Edit comment
              </p>
              <p
                className="p-4 cursor-pointer hover:bg-slate-400"
                onClick={handleDelete}
              >
                Delete comment
              </p>
            </Popover>
          </button>
        </div>
      </div>
      <p>{data.commenter.username}</p>
    </>
  );
}

export default Comment;
