import React, { useState } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const MyProfile = () => {
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
          <Box display="flex" alignItems="center" marginBottom={2}>
            <Avatar sx={{ width: 80, height: 80 }} />
            <Typography variant="h4" marginLeft={2}>
              {user.username}
            </Typography>
          </Box>
          <Typography variant="body1" marginBottom={2}>
            {user.bio}
          </Typography>
          <Typography variant="h5" marginBottom={1}>
            Posts
          </Typography>
          <ul>
            {user.posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
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

export default MyProfile;
