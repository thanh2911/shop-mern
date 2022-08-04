import {useState, useEffect} from 'react'
import axios from 'axios'

function PostsAPI() {
    const [posts, setPosts] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getPosts = async () =>{
            const res = await axios.get('/api/posts')
            setPosts(res.data)
        }

        getPosts()
    },[callback])
    return {
        posts: [posts, setPosts],
        callback: [callback, setCallback]
    }
}

export default PostsAPI