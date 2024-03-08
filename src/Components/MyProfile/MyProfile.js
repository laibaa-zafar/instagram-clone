import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import { Card, Col, Row } from "react-bootstrap";
import { FaHeart, FaComment } from "react-icons/fa";

const MyProfile = () => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const userId = 8;
  const [commentContent, setCommentContent] = useState("");
  const [newComment, setNewComment] = useState("");

  const fetchData = async () => {
    try {
      let result = await fetch("http://localhost:8000/api/index");
      result = await result.json();
      setData(result.posts);

      try {
        let result = await fetch("http://localhost:8000/api/getComments");
        result = await result.json();
        setComments(result.comments);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLike = (postid) => {
    if (userId) {
      console.log("Liked post with ID:", postid);
    } else {
      console.log("User is not logged in.");
    }
  };

  const handleUnlike = (postId) => {
    if (userId) {
      console.log("Unliked post with ID:", postId);
    } else {
      console.log("User is not logged in.");
    }
  };

  const handleComment = async (postid, content, id) => {
    try {
      const response = await fetch("http://localhost:8000/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid: postid,
          id: id,
          content: content,
        }),
      });

      if (response.ok) {
        console.log("Comment saved successfully.");
        setNewComment(content); 
        setCommentContent(""); 
        fetchData(); 
      } else {
        console.error("Failed to save comment.");
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
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
              <span></span>
              <IconButton onClick={() => handleUnlike(post.id)}>
                <FaHeart />
              </IconButton>
              <IconButton>
                <FaComment />
              </IconButton>
            </Box>
            {/* Display comments */}
            {comments
              .filter((comment) => comment.post_id === post.id)
              .map((comment) => (
                <Typography key={`comment_${comment.id}`} variant="body2">
                  {comment.content}
                </Typography>
              ))}
            <TextField
              label="Add a comment"
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleComment(post.id, commentContent, userId);
                }
              }}
            />
            {comments
              .filter((comment) => comment.postid === post.id)
              .map((comment) => (
                <Typography key={`comment_${comment.id}`} variant="body2">
                  {comment.content}
                </Typography>
              ))}
            {newComment && (
              <Typography variant="body2">{newComment}</Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleComment(post.id, commentContent, userId)}
            >
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
