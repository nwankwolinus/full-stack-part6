import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getAll } from '../services/blogs'

const Blogs = () => {
  const result = useQuery({
    queryKey: ['blogs'], 
    queryFn: getAll
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <div key={blog.id} >
          <Link to={`/blogs/${blog.id}`} >
            {blog.title} by {blog.author}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Blogs