import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmailConfirm from "./pages/EmailConfirm";
import ForgotPass from "./pages/ForgotPass";
import ChangePass from "./pages/ChangePass";
import Users from "./pages/Users";

export default function routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/add" index element={<AddPage />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/register" index element={<Register />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/changePass/:token" element={<ChangePass />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return <div>Page not Found</div>;
}
