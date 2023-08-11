import React, { useState, useEffect } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

const CreatePost = ({isAuth}) => {
    let navigate = useNavigate();
    const [title,setTitle] = useState("")
    const [postText,setPostText] = useState("")

    const postCollectionRef = collection(db, "posts")
    const createpost = async () => {
        await addDoc(postCollectionRef, {title, postText, author: { name: auth.currentUser.displayName , id: auth.currentUser.uid}})
        navigate("/")
    }

    useEffect(() => {
        if(!isAuth){
            navigate("React_firebase_blog/")
        }

    }, [])

  return (
    <div className='create-post-page'>
        <div className='container' >
            <h1>
                Create a post
            </h1>
            <div className='input-group'>
                <label>Title:</label>
                <input onChange={(e) => setTitle(e.target.value)} placeholder='Title...' />
            </div>
            <div className='input-group'>
                <label>Post:</label>
                <textarea onChange={(e) => setPostText(e.target.value)} placeholder="psot...." />
            </div>
            <button onClick={createpost}>Submit Post</button>
        </div>

    </div>
  )
}

export default CreatePost