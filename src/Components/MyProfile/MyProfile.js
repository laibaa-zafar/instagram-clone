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
import { Card, Col, Row } from "react-bootstrap";
import { FaHeart, FaComment } from "react-icons/fa";

const MyProfile = () => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [newComment, setNewComment] = useState("");

  const fetchData = async () => {
    try {
      // Fetching all posts
      let postsResponse = await fetch("http://localhost:8000/api/index");
      let postsResult = await postsResponse.json();
      setData(postsResult.posts);

      // Fetching all comments
      let commentsResponse = await fetch("http://localhost:8000/api/getComments");
      let commentsResult = await commentsResponse.json();
      setComments(commentsResult.comments);

      // Fetching like status
      let likeStatusPromises = postsResult.posts.map(post =>
        fetch(`http://localhost:8000/api/likeStatus`)
          .then(response => response.json())
      );
      let likeStatuses = await Promise.all(likeStatusPromises);

      // Combine like status with posts data
      setData(prevData => prevData.map((post, index) => ({
        ...post,
        isLiked: likeStatuses[index].isLiked,
        totalLikes: likeStatuses[index].totalLikes,
        totalUnlikes: likeStatuses[index].totalUnlikes
      })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user-info');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUserId(userInfo.id);
      setUsername(userInfo.username);
      console.log(storedUserInfo)
    }
    fetchData();
  }, []);
  

  const handleLike = async (postid) => {
    try {
      if (!userId || !username) {
        console.log("User is not logged in.");
        return;
      }
  
      // Check if the user has already liked the post
      const likeStatusResponse = await fetch(`http://localhost:8000/api/likeStatus?postid=${postid}&id=${userId}`);
      const likeStatusData = await likeStatusResponse.json();
      if (likeStatusResponse.ok && likeStatusData.isLiked) {
        console.log("User has already liked the post.");
        return;
      }
  
      // Insert a new like if the user has not already liked the post
      const response = await fetch(`http://localhost:8000/api/likePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          postid: postid,
          id: userId,
        }),
      });
  
      if (response.ok) {
        console.log("Liked post with ID:", postid);
        fetchData();
      } else {
        const errorData = await response.json();
        console.error("Failed to like post:", errorData.message);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  
  
  const handleUnlike = async (postid, id, username) => {
    try {
      const response = await fetch(`http://localhost:8000/api/unlikePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          username: username,
          postid: postid,
        }),
      });

      if (response.ok) {
        console.log("Unliked post with ID:", postid);
        fetchData();
      } else {
        console.error("Failed to unlike post.");
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleComment = async (postid) => {
    try {
      const response = await fetch("http://localhost:8000/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid: postid,
          id: userId,
          content: commentContent,
        }),
      });

      if (response.ok) {
        console.log("Comment saved successfully.");
        setNewComment(commentContent);
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
              <span>{post.likes}</span>
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
                  handleComment(post.id);
                }
              }}
            />
            {comments
              .filter((comment) => comment.post_id === post.id)
              .map((comment) => (
                <Typography key={`comment_${post.id}_${comment.id}`} variant="body2">
                  <strong>{comment.username}: </strong>
                  {comment.content}
                </Typography>
              ))}
            {newComment && (
              <Typography variant="body2">{newComment}</Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleComment(post.id)}
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
      <Grid container justifyContent="center" alignItems="flex-start" spacing={2} marginLeft={30}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Avatar sx={{ width: 80, height: 80 }} />
            <Typography variant="h4" marginLeft={2}>
              {username}
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
