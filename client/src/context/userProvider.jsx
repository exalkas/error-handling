import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    let userData = {};

    if (storedData) userData = JSON.parse(storedData);

    console.log("🚀 ~ userData:", userData);

    if (userData._id) setUser({ ...userData });
  }, []);

  const [user, setUser] = useState({
    username: "",
    _id: "",
  });

  const [posts, setPosts] = useState([]);

  // NO COOKIES
  // useEffect(() => {
  //   async function getData() {
  //     const token = localStorage.getItem("social_media_cookie");

  //     const response = await fetch(
  //       "http://localhost:5000/posts/get/allNoCookie",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // WITH AXIOS
  //     // const response = await axios.get("http://localhost:5000/posts/get/all", {
  //     //   headers: {
  //     //     Authorization: `Bearer ${token}`,
  //     //   }
  //     // });

  //     const data = await response.json();
  //     console.log("🚀 ~ data:", data);

  //     if (data.success) {
  //       setPosts(data.posts);
  //     }
  //   }

  //   getData();
  // }, []);

  // WITH COOKIES
  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch("http://localhost:5000/posts/get/all", {
  //       method: "GET",
  //       credentials: "include",
  //     });

  //     const data = await response.json();
  //     console.log("🚀 ~ data:", data);

  //     if (data.success) {
  //       setPosts(data.posts);
  //     }
  //   }

  //   getData();
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser, posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
}
