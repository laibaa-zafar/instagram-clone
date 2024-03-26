import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Card, Col, Row } from "react-bootstrap";
import { FaHeart, FaComment, FaShare, FaEllipsisV } from "react-icons/fa";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/index");
        const result = await response.json();
        setData(result.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    const intervalId = setInterval(fetchData, 2000); 
  
    return () => clearInterval(intervalId); 
  }, []);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUploaded(true);
    };
    setFile(e.target.files[0]);
    reader.readAsDataURL(file);
  };

  const addPost = async (e) => {
    e.preventDefault();
    
    try {
      const storedUserInfo = localStorage.getItem('user-info');
      if (!storedUserInfo)
      {
        console.error('User info not found in local storage');
        return;
      } 
      const userInfo = JSON.parse(storedUserInfo);
      const formData = new FormData();
      formData.append("file_path", file);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("id", userInfo.id);
  
      let result = await fetch("http://localhost:8000/api/addPost", {
        method: "POST",
        body: formData,
      });
      console.log(result);
      if (result.ok) {
        alert("Data has been saved");
        setName("");
        setFile("");
        setDescription("");
        setImageUploaded(false);
      } 
      else {
        console.error("Failed to save data:", result.statusText);
      }
    } 
    catch (error) {
      console.error("Error:", error);
      alert("Failed to save data. Please try again.");
    }
  };
  

  const handleDeletePost = async (postId) => {
    try {
      let result = await fetch(`http://localhost:8000/api/deletePost/${postId}`, {
        method: "DELETE",
      });
      console.log(result);
      if (result.ok) {
        alert("Post has been deleted");
        setData(data.filter(post => post.id !== postId)); 
      } else {
        console.error("Failed to delete post:", result.statusText);
      }
    } 
    catch (error) {
      console.error("Error:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleMenuClick = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const user = {
    username: "example_user",
    bio: "This is a sample bio.",
    posts: [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
      { id: 3, title: "Post 3" },
    ],
  };

  return (
    <>
      <Sidebar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={6}>
          <form onSubmit={addPost}>
            <input
              type="file"
              className="form-control"
              onChange={handleImageUpload}
              placeholder="add file"
            />
            <br />
            <br />
            <>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Write title for your post"
              />

              <br />
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write description"
              />
              <br />
              <br />
              <Button variant="contained" type="submit">
                Add Post
              </Button>
              <br />
            </>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
