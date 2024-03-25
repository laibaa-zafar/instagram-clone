import React, { useState, useEffect } from 'react';
import './UserProfile.css'; 
import Sidebar from '../Sidebar/Sidebar';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [editingBio, setEditingBio] = useState(true); 

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user-info');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setUsername(userInfo.username);
      setBio(userInfo.bio || '');
      setAvatarUrl(userInfo.avatarUrl || '');
      fetchUserPosts(userInfo.id); 
    }
  }, []);
  

  const fetchUserPosts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/index/${userId}`);
      const result = await response.json();
      setData(result.posts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = () => {
    console.log('file:', file);
    console.log('Description:', description);
   
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUserInfo = localStorage.getItem('user-info');
    if (storedUserInfo){
        const userInfo = JSON.parse(storedUserInfo);
        localStorage.setItem('user-info', JSON.stringify({...userInfo, bio}));
        setEditingBio(false); 
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <h1 className="welcome-message">Welcome, {username}!</h1>
      <div className="profile-header">
        <img src={avatarUrl || './Images/avatar.png'} alt="Avatar" className="avatar" />
        <h2 className="username">{username}</h2>
        {editingBio ? (
          <form onSubmit={handleSubmit} className="bio-form">
            <textarea
              value={bio}
              onChange={handleBioChange}
              placeholder="Write your bio..."
              className="bio-input"
            />
            <button type="submit" className="save-button">Save</button>
          </form>
        ) : (
          <p onClick={() => setEditingBio(true)}>{bio}</p>
        )}
      </div>
      <div className="posts-container">
        {data.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-username">{post.username}</h3>
            <img src={`http://localhost:8000/${post.file_path}`} alt={post.title} className="post-image" />
            <h3 className="post-title">{post.name}</h3>
            <p className="post-description">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;