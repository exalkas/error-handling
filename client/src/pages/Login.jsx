import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userProvider";
import Spinner from "../components/Spinner";

export default function Login() {
  const [showSpinner, setShowSpinner] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      setShowSpinner(true);
      e.preventDefault();

      const body = {
        username,
        password,
      };

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type header for JSON
          },
          body: JSON.stringify(body), // Convert the JavaScript object to a JSON string
          credentials: "include", // Include cookies for cross-origin requests
        }
      );

      const data = await response.json();

      // const response = await axios.post(
      //   "http://localhost:5000/auth/login",
      //   body,
      //   { withCredentials: true }
      // );
      console.log("🚀 ~ data:", data);

      if (!response.ok) {
        setError(data.error || "Something went wrong!");
        throw new Error(data.error || "HTTP error!");
      }

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(error.message || "A network error occurred");
    }

    setShowSpinner(false);
  };

  const handleSubmitNoCookie = async (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };
    const response = await axios.post(
      "http://localhost:5000/auth/loginNoCookie",
      body
    );
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      localStorage.setItem("social_media_cookie", response.data.token);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } else {
      setError(response.data.error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center min-h-screen "
      onSubmit={handleSubmit}
    >
      <div className="p-6 bg-white rounded shadow-md">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4  border rounded focus:outline-none focus:shadow-outline text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 text-white border rounded focus:outline-none focus:shadow-outline"
        />
        <p className="text-red-500 h-[2rem]">{error}</p>
        <button
          type="submit"
          id="loginButton"
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          {showSpinner ? <Spinner /> : "Login"}
        </button>
        <div>
          <Link to="/forgotPass">Forgot pass?</Link>
        </div>
      </div>
    </form>
  );
}
