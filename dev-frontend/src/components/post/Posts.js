import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import CreatePost from "./CreatePost";

function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [handle, setHandle] = useState(null);

  const newPostHandler = (value) => {
    console.log(value);
    setHandle(value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/post", {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setPosts(data);
          setIsLoading(false);
        });
      })
      .catch((err) => console.log(err));
  }, [handle]);
  console.log("posts ll");
  console.log(posts);
  return (
    <>
      {isLoading && (
        <p style={{ marginTop: "20px", textAlign: "center" }}>Loading...</p>
      )}
      {!isLoading && (
        <div>
          <CreatePost new={newPostHandler} />
          {posts.map((element) => (
            <SinglePost key={element._id} data={element} />
          ))}
        </div>
      )}
    </>
  );
}

export default Posts;
