import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const Home = ({isAuth}) => {
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

  const deletePost = async (id) => {
    console.log('helllo')
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
  }

  return (
    <div className="home">
      {postLists.map((post) => (
        <div key={post.id}>
          {console.log(post)}
          <h1>{post.title}</h1>
          <h3>{post.postText}</h3>
          <h2>{post.author.name}</h2>
          {
            isAuth && post.author.id === auth.currentUser.uid && (
          <div className="delete-post">
            <h2 onClick={() => deletePost(post.id)} >Delete</h2>
          </div>
            )
          }
        </div>
      ))}
    </div>
  );
};

export default Home;
