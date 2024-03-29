import { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import { UserContext } from "../context/userProvider";
import axios from "axios";

export default function Home() {
  const { user, posts, setPosts } = useContext(UserContext);
  console.log("🚀 ~ user:", user);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BASE_URL + "/posts/get/all",
          // import.meta.env.VITE_BASE_URL + "/posts/get/allNoCookie",
          {
            withCredentials: true,
          }
        );
        console.log("🚀 ~ response:", response);

        setPosts(response.data.posts);
      } catch (error) {
        console.log("Error getting posts", error.message);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-[20px] mt-[40px]">
      {posts.map((item) => (
        <Post key={item._id} data={item} />
      ))}
    </div>
  );
}
