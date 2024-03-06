import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Card, Button, Col, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

function PostList() {
  const [data, setData] = useState([]);

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
  }, []);

  const handleLike = (postId) => {
    // like logic startsve here
        console.log("Liked post with ID:", postId);
  };

  const handleUnlike = (postId) => {
    // Unlike logic starts here
    console.log("Unliked post with ID:", postId);
  };

  return (
    <div>
      <Sidebar />
      <h1>Home</h1>
      <div className="container" style={{ margin: "20px auto", width: "80%" }}>
        <Row>
          
          {data.map((post) => (
              

            <Col md={6} key={post.id}>
              
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
                  <Button
                    variant="outline-danger"
                    onClick={() => handleLike(post.id)}
                  >
                    <FaHeart />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleUnlike(post.id)}
                  >
                    <FaHeart />
                  </Button>{" "}
                  <Button variant="secondary">Comment</Button>
                  <div style={{ marginTop: "10px" }}>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Add a comment"
                    ></textarea>
                  </div>
                  <div>{/* Display comments here */}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default PostList;
