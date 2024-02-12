import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function Register() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.patch(
      import.meta.env.VITE_BASE_URL + "/auth/changePass",
      {
        password,
        token,
      }
    );
    console.log("🚀 ~ response:", response);

    if (response.data.success) {
      alert(
        "Your password changed successfully. Soon you will be redirected to the login page"
      );

      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false); // hide the spinner after 5 sec
        navigate("/login"); // redirect to login
      }, 3000);
    }
  };

  return showSpinner ? (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner />
    </div>
  ) : (
    <form
      className="flex flex-col items-center justify-center min-h-screen"
      onSubmit={handleSubmit}
    >
      <div className="p-6 bg-white rounded shadow-md">
        <input
          type="text"
          name="username"
          placeholder="type your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4  border rounded focus:outline-none focus:shadow-outline text-white"
        />

        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </div>
      <p>{token}</p>
    </form>
  );
}
