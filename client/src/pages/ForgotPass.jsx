import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/auth/forgotPass",
      {
        usernameOrEmail,
      }
    );
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      alert(
        "We have sent you instructions how to change your password in an email"
      );
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
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          className="w-full p-3 mb-4  border rounded focus:outline-none focus:shadow-outline text-white"
        />

        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </div>
    </form>
  );
}
