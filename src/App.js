import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm.js";
import SignupForm from "./Components/SignupForm/SignupForm.js";
import Sidebar from "./Components/Sidebar/Sidebar.js";
import MyProfile from "./Components/MyProfile/MyProfile.js";
import PostList from "./Components/PostList/PostList.js";
import UserProfile from "./Components/UserProfile/UserProfile.js";
import HomePage from "./Components/Homepage/HomePage.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn === "true" ? true : false;
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === 'true');
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!(isLoggedIn === 'true') ? <LoginForm /> : <HomePage/>}
        />
        <Route path="/signup" element={<SignupForm />} />
        {isLoggedIn && (
          <>
            <Route path="/sidebar" element = {<Sidebar />} />
            <Route path="/postslist" element = {<PostList />} />
            <Route path="/myprofile" element = {<MyProfile />} />
            <Route path="/userprofile" element = {<UserProfile />} />
            <Route path="/homepage" element = {<HomePage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;