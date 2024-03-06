import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Card, Col, Row } from "react-bootstrap";
import { FaHeart, FaComment } from "react-icons/fa";

const MyProfile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await fetch("http://localhost:8000/api/index");
        result = await result.json();
        setData(result.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);

  }, []);

  const handleLike = (postId) => {
    // Handle like logic
    console.log("Liked post with ID:", postId);
  };

  const handleUnlike = (postId) => {
    // Handle unlike logic
    console.log("Unliked post with ID:", postId);
  };

  const renderPosts = () => {
    return data.map((post) => (
      <Col md={6} key={`post_${post.id}`}>
        <Card style={{ marginBottom: "20px" }}>
          <Card.Img
            variant="top"
            style={{ borderRadius: "15px" }}
            src={`http://localhost:8000/${post.file_path}`}
            alt={post.name}
          />
          <Card.Body>
            <Card.Title>{post.name}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => handleLike(post.id)}>
                <FaHeart />
              </IconButton>
              <span>0</span>
              <IconButton onClick={() => handleUnlike(post.id)}>
                <FaHeart />
              </IconButton>
              <IconButton>
                <FaComment />
              </IconButton>
            </Box>
            <TextField
              label="Add a comment"
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" fullWidth>
              Comment
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
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
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Avatar sx={{ width: 80, height: 80 }} />
            <Typography variant="h4" marginLeft={2}>
              User Name
            </Typography>
          </Box>
          <Typography variant="body1" marginBottom={2}>
            This is a sample bio.
          </Typography>
          <Typography variant="h5" marginBottom={1}>
            Posts
          </Typography>
          <Row>{renderPosts()}</Row>
        </Grid>
      </Grid>
    </>
  );
};

export default MyProfile;
