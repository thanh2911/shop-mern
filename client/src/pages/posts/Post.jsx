import React , {useState , useContext, useRef, useEffect} from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import Modal ,{ ModalContent} from '../../components/modal/Modal';
import Button from '../../components/button/Button';
import { BiLike } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';

import axios from 'axios';
import './post.scss'

const initialStatePost = {
    text : ''
}


const Post = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [posts] = state.postsAPI.posts;
    const [callback,setCallback] = state.postsAPI.callback;
    const [user] = state.userAPI.user;

    const [post,setPost] = useState(initialStatePost);

    const [onEdit,setOnEdit] = useState(false);
    const [postID,setPostID] = useState('');

    useEffect(() => {
        const buttonThreeDots = document.querySelectorAll('.icon-threedot');
        const boxEditPosts = document.querySelectorAll('.box-edit__box');

        // console.log(buttonThreeDots);
        buttonThreeDots.forEach(dot => {    
            dot.onclick = () => {
                const dot_id = dot.getAttribute('data-id');
                boxEditPosts.forEach((box) => {
                    const box_id = box.getAttribute('data-id');
                    if(box_id === dot_id) {
                        box.classList.toggle('active')
                        // console.log(box);
                    }
                })
            }
        });
    })

    const closeBoxEditPost = () => {
        const boxEditPosts = document.querySelectorAll('.box-edit__box');

        boxEditPosts.forEach((box) => {
            box.classList.remove('active')
        })
    }

    const handlePostInput = e => {
        const {name,value} = e.target ;
        setPost({...post , [name]:value})
    }

    const openPostArticles = () => {
        const modal = document.querySelector('#modal-post');
        modal.classList.toggle(`active`);
    }
    
    const postArticles = async e => {
        e.preventDefault()
        try {
            if(onEdit) {
                await axios.put(`/api/posts/${postID}`,{...post}, {
                    headers: {Authorization: token}
                })
            }
            else {
                await axios.post('/api/posts', {...post}, {
                    headers: {Authorization: token}
                })
            }

            setPost(initialStatePost)
            setOnEdit(false)
            setCallback(!callback);
            openPostArticles();

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const deletePosts = async (post_id ) => {
        try {
            await axios.delete(`/api/posts/${post_id}`, {
                headers: {Authorization: token}
            })
            setCallback(!callback);

        } catch (error) {
            alert(error.response.data.msg)
        }
    }



    const editPosts = (post_id) => {
        setOnEdit(true);
        setPostID(post_id);
        openPostArticles();
        closeBoxEditPost();
    }

    const likePost = () => {
        alert('Tính năng này đang bị lỗi')
    }

    const sharePost = () => {
        alert('Ttính năng này chưa thực hiện')
    }

  return (
    <div className="post">
        <div className="post-article">
            {   user && <p>{user.name.substring(0,1)}</p>}
            {
                user &&  
                <input type="text" name='post-article' onFocus={openPostArticles}
                placeholder={`${user.name}, Bạn muốn đăng gì `}
                />
            }
        </div>

        <Modal id='modal-post'>
            <ModalContent>
                <form action="" onSubmit={postArticles}>
                    <h3>Tạo bài viết</h3>
                    <div className="modal-post__user">
                        {user && <p>{user.name.substring(0,1)}</p>}
                        {user && <span>{user.name}</span>}
                    </div>
                    
                    { user && 
                    <textarea type="text" id='text' name='text' required
                    value={post.text} onChange={handlePostInput}  placeholder={`${user.name}, Bạn muốn đăng gì `}
                    />}

                    <Button size='sm' type='submit'>{onEdit ? 'Edit' : 'Đăng'}</Button>
                </form>
                </ModalContent>
        </Modal>

        {
            posts.map((item,index) => (
                <div className="post-item" key={index} >
                    <div className="post-item__user">
                        <p>{item.name.substring(0,1)}</p>
                        <span>{item.name}</span>
                    </div>
                    <div className="post-item__threedot">
                        <div className="icon-threedot" data-id = {item._id}>
                            <BsThreeDots />
                        </div> 
                        <div className={`box-edit__box`} data-id={item._id} >
                        {
                            item.user === user._id ? 
                            <p onClick={() => editPosts(item._id)}>chỉnh sửa</p> : null
                        }
                        {   item.user === user._id ? 
                            <p onClick={() => deletePosts(item._id)}>xóa</p> : null
                        }
                        <p onClick={closeBoxEditPost}>thoát</p>
                        </div>
                    </div>
                    <Link to={`/detail-post/${item._id}`} className="post-item__text">
                        {item.text}
                    </Link>

                    <div className="post-item__footer">
                        <div className="post-item__like" onClick={likePost}>
                            <BiLike />
                            <span>Thích</span>
                        </div>
                        <Link to={`/detail-post/${item._id}`} className="post-item__comment">
                            <GoComment/>
                            <span>Bình luận</span>
                        </Link>
                        <div className="post-item__share" onClick={sharePost}>
                            <RiShareForwardLine/>
                            <span>Chia sẻ</span>
                        </div>
                    </div>

            </div>
            ))
        }
    </div>
  )
}

export default Post