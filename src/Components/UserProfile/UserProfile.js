import React, { useState, useEffect } from 'react';
import './UserProfile.css'; 
import Sidebar from '../Sidebar/Sidebar';
import HomePage from '../Homepage/HomePage';

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
    }
  }, []);

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
    console.log('File:', file);
    console.log('Description:', description);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo){
        const userInfo = JSON.parse(storedUserInfo);
        localStorage.setItem('userInfo', JSON.stringify({...userInfo, bio}));
        setEditingBio(false); 
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <h1 className="welcome-message">Welcome, {username}!</h1>
      <div className="profile-header">
        <img src="./Images/avatar.png" alt="Avatar" className="avatar" />
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
      <HomePage/>
    </div>
  );
};

export default UserProfile;
