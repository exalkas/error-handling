import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // if (username.length < 3) {
      //   setError("Username must be at least 3 characters");
      //   return;
      // }

      // if (password.length < 3) {
      //   setError("Password must be at least 3 characters");
      //   return;
      // }
      const body = {
        username,
        password,
      };

      const response = await axios.post(
        "htt://localhost:5000/auth/register",
        body
      );
      console.log("🚀 ~ response:", response.data);

      if (response.data.success) navigate("/login");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <div className="p-6 bg-white rounded shadow-md">
        <input
          type="text"
          name="username"
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
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </form>
  );
}
