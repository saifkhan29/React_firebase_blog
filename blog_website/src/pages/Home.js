import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const Home = () => {
  const [postLists, setPostLists] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      console.log(data.docs)
      setPostLists(data.docs.map((item) => ({ ...item.data(), id: item.id})));
    };

    getPosts();
  }, []);

  return (
    <div className="home">
      {postLists.map((post) => (
        <div key={post.id}>
          {console.log(post)}
          <h1>{post.title}</h1>
          <h3>{post.postText}</h3>
          <h2>{post.author.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Home;
