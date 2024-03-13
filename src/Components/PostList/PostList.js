import React, { useState, useEffect } from "react";
import { IconButton, TextField, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import OutboxIcon from "@mui/icons-material/Outbox";
import Sidebar from "../Sidebar/Sidebar";

const Post = ({ title, caption, id, postid, username }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // handle like function .. 
  const handleLike = async (postid, id, username) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/likePost/${postid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postid: postid,
            id: id,
            username: username,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setLiked(true);
        setLikeCount(likeCount + 1);
        // console.log(response);
      } else {
        console.error("Failed to like post:", result.message);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  // handle unlike function
  // const handleUnlike = async (postId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/unlikePost/${postId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         liked: false,
  //       }),
  //     });
  //     const result = await response.json();
  //     if (result.success) {
  //       setLiked(false);
  //       setLikeCount(likeCount - 1);
  //     } else {
  //       console.error("Failed to unlike post:", result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error unliking post:", error);
  //   }
  // };

  const handleComment = async (postid, id, content) => {
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
      const result = await response.json();
      if (result.success) {
        setComments([...comments, { username: "User", content: comment }]);
        setComment("");
      } else {
        console.error("Failed to save comment:", result.message);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <div style={{ marginLeft: "28rem", marginTop: "4rem" }}>
      <Typography variant="h6">{title}</Typography>
      <img
        src="./Images/tree.jpg"
        alt="user post"
        style={{ maxWidth: "30%", height: "auto" }}
      />
      <Typography variant="body1">{caption}</Typography>
      <div>
        <IconButton onClick={() => handleLike (postid, id, username)}>
          {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <span>{likeCount}</span>
        <IconButton>
          <CommentIcon />
        </IconButton>
        <IconButton>
          <OutboxIcon />
        </IconButton>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <Typography variant="body2">
              <strong>{comment.username}</strong>: {comment.content}
            </Typography>
          </div>
        ))}
      </div>
      <div>
        <TextField
          label="Add a comment"
          variant="outlined"
          size="small"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleComment}>
          Comment
        </Button>
      </div>
    </div>
  );
};

const PostsPage = () => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/index");
        const result = await response.json();
        setData(result.posts);

        const commentsResponse = await fetch(
          "http://localhost:8000/api/getComments"
        );
        const commentsResult = await commentsResponse.json();
        setComments(commentsResult.comments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginLeft: "300px",
          padding: "20px",
        }}
      >
        {data.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            caption={post.caption}
            postid={post.postid}
          />
        ))}
      </div>
    </>
  );
};

export default PostsPage;
