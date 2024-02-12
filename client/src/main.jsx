import ReactDOM from "react-dom/client";
import Routes from "./Routes.jsx";
import "./index.css";
import UserProvider from "./context/userProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <Routes />
  </UserProvider>
);
