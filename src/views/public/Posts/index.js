import {useState} from 'react'
import {Paper, Typography} from '@material-ui/core';

import firebase from 'firebase';
import {useEffect} from 'react';

import './index.scss'

const Posts = () => {
  const db = firebase.firestore()
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    const postsSnapshot = await db.collection('posts').get()
    setPosts(postsSnapshot.docs.map(doc => doc.data()))

    console.log(firebase.firestore.FieldValue.serverTimestamp())

    console.log(postsSnapshot.docs.map(doc => doc.data()))
  }, [])

  return (
      <Paper className="posts">
        {posts.map(post => (
          <div className="posts__item">
            <Typography gutterBottom>
              title: {post.title}
            </Typography>
            <Typography gutterBottom>
              description: {post.desc}
            </Typography>
            <img
              className="posts__item-img"
              src={post.image} alt=""
            />
          </div>
        ))}
      </Paper>

  )
}

export {
  Posts
}
