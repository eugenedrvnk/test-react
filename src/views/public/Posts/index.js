import {useState} from 'react'
import {Button, Paper, Typography} from '@material-ui/core';

import firebase from 'firebase';
import {useEffect} from 'react';

import {api} from '../../../api';
import './index.scss'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    const posts = await api.posts.get()
    setPosts(posts)
  }, [])

  const deletePost = (id) => {
    api.posts.delete(id)
      .then(() => {
        const nextPosts = [...posts]
        const postIdxToSplice = posts.findIndex(post => post.id === id)
        nextPosts.splice(postIdxToSplice, 1)
        setPosts(nextPosts)

        alert('post deleted')
      })
  }

  return posts.length ? (
    <Paper className="posts">
      {posts.map(post => (
        <div
          className="posts__item"
          key={post.id}
        >
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
          <Button
            className="posts__delete-btn"
            onClick={() => deletePost(post.id)}
          >
            delete post
          </Button>
        </div>
      ))}
    </Paper>
  ) : <h2>no posts</h2>
}

export {
  Posts
}
