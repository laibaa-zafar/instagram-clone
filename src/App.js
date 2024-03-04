import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm.js";
import SignupForm from "./Components/SignupForm/SignupForm.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import MyProfile from "./Components/MyProfile/MyProfile.js";
import PostsFunctionality from "./Components/PostsFunctionality/PostsFunctionality.js";
import { Login } from "@mui/icons-material";

function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  const isLoggedIn = localStorage.getItem("email") && localStorage.getItem("password");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <LoginForm /> : <LoginForm />}
        />
        <Route path="/signup" element={<SignupForm />} />
        {isLoggedIn && (
          <>
            <Route path="/sidebar" element={<Sidebar />} />
            <Route
              path="/postsfunctionality"
              element={<PostsFunctionality />}
            />
            <Route path="/myprofile" element={<MyProfile />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
