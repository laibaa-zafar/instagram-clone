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
      const formData = new FormData();
      console.log(file);
      formData.append("file_path", file);
      formData.append("name", name);
      formData.append("description", description);
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
      } else {
        console.error("Failed to save data:", result.statusText);
      }
    } catch (error) {
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
        setData(data.filter(post => post.id !== postId)); // Remove post from state
      } else {
        console.error("Failed to delete post:", result.statusText);
      }
    } catch (error) {
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
        alignItems="flex-start"
        spacing={2}
        marginLeft={30}
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
      <div
        className="container"
        style={{ margin: "200px auto", width: "50px", height: "20px" }}
      >
        <Row>
        {data.map((post) => (
          
          
  <Col md={6} key={`post_${post.id}`}>
    <Card style={{ marginBottom: "20px" }}>
      <Card.Img
        variant="top"
        style={{ borderRadius: "15px", width: 350, height: 500 }} // Set width to 100% and height to auto
        src={`http://localhost:8000/${post.file_path}`}
        alt={post.name}
      />
      <Card.Body>
        <Card.Title>{post.name}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button variant="light" style={{ marginRight: "5px" }}>
            <FaHeart /> Like
          </Button>
          <Button variant="light" style={{ marginRight: "5px" }}>
            <FaComment /> Comment
          </Button>
          <IconButton
            aria-label="options"
            onClick={(event) => handleMenuClick(event, post.id)}
            style={{ padding: "5px" }}
          >
            <FaEllipsisV />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedPostId === post.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {}}>Update Post</MenuItem>
            <MenuItem onClick={() => handleDeletePost(post.id)}>Delete Post</MenuItem>
          </Menu>
        </div>
        <div>{/* Display comments here */}</div>
      </Card.Body>
    </Card>
  </Col>
))}
        </Row>
      </div>
    </>
  );
};

export default HomePage;
