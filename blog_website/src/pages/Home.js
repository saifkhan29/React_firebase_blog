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
    <div className="home mt-4">
      <h1 className="h3">All Blog Posts</h1>
      {postLists.map((post) => (
        <div className="post_container" key={post.id}>
          <h1 className="font-20 mb-2 fw-bold">{post.title}</h1>
          <h3 className="font-18 mb-2">{post.postText}</h3>
          <h2 className="font-16">@ {post.author.name}</h2>
          {
            isAuth && post.author.id === auth.currentUser.uid && (
          <div className="delete-post mt-1 btn btn-danger text-white ">
            <h2 className="font-18 mb-0" onClick={() => deletePost(post.id)} >Delete</h2>
          </div>
            )
          }
        </div>
      ))}
    </div>
  );
};

export default Home;
