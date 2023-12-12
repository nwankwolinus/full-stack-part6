import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOne, deleteBlog, update, comment } from '../services/blogs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotifier } from '../contexts/notification'

import { useUser } from '../contexts/user'

import PropTypes from 'prop-types'
import { SmallButton, Input } from './styled'

const Blog = () => {
  const [comment, setComment] = useState('')
  const id = useParams().id

  const notifyWith = useNotifier()
  const navigate = useNavigate()

  const result = useQuery({
    queryKey: ['blogs', id], 
    queryFn: () => getOne(id),
    retry: 2
  })
  const user = useUser()

  const queryClient = useQueryClient()
  const removeBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const commentBlogMutation = useMutation({
    mutationFn: comment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blog = result.data

  if (!blog || !user) {
    return null
  }

  const canRemove = blog.user.username === user.username

  const like = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    updateBlogMutation.mutate(blogToUpdate)
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const remove = async () => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if (ok) {
      removeBlogMutation.mutate(blog.id)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      navigate('/')
    }
  }

  const addComment = (blog) => {
    commentBlogMutation.mutate({ ...blog, comments: blog.comments })
    notifyWith('Comment added!')
    setComment('')
  }

  const margined = { marginBottom: 5 }

  return (
    <div className="blog">
      <div style={ margined }>
        <strong>{blog.title} </strong> by <strong>{blog.author}</strong>
      </div>

      <div style={ margined }>
        <a href={blog.url}> {blog.url}</a>{' '}
      </div>

      <div style={ margined }>
        likes {blog.likes} <SmallButton onClick={like}>like</SmallButton>
      </div>

      <div style={ margined }>
        added by {blog.user && blog.user.name}
      </div>
      {canRemove && <SmallButton onClick={remove}>delete</SmallButton>}

      <h3>comments:</h3>

      <Input value={comment} onChange={({ target }) => setComment(target.value)} />
      <SmallButton disabled={comment.length===0} onClick={addComment}>
        add comment
      </SmallButton>

      <ul>
        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

    </div>
  )
}

export default Blog