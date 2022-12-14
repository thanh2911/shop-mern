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
        alert('T??nh n??ng n??y ??ang b??? l???i')
    }

    const sharePost = () => {
        alert('Tt??nh n??ng n??y ch??a th???c hi???n')
    }

  return (
    <div className="post">
        <div className="post-article">
            {   user && <p>{user.name.substring(0,1)}</p>}
            {
                user &&  
                <input type="text" name='post-article' onFocus={openPostArticles}
                placeholder={`${user.name}, B???n mu???n ????ng g?? `}
                />
            }
        </div>

        <Modal id='modal-post'>
            <ModalContent>
                <form action="" onSubmit={postArticles}>
                    <h3>T???o b??i vi???t</h3>
                    <div className="modal-post__user">
                        {user && <p>{user.name.substring(0,1)}</p>}
                        {user && <span>{user.name}</span>}
                    </div>
                    
                    { user && 
                    <textarea type="text" id='text' name='text' required
                    value={post.text} onChange={handlePostInput}  placeholder={`${user.name}, B???n mu???n ????ng g?? `}
                    />}

                    <Button size='sm' type='submit'>{onEdit ? 'Edit' : '????ng'}</Button>
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
                            <p onClick={() => editPosts(item._id)}>ch???nh s???a</p> : null
                        }
                        {   item.user === user._id ? 
                            <p onClick={() => deletePosts(item._id)}>x??a</p> : null
                        }
                        <p onClick={closeBoxEditPost}>tho??t</p>
                        </div>
                    </div>
                    <Link to={`/detail-post/${item._id}`} className="post-item__text">
                        {item.text}
                    </Link>

                    <div className="post-item__footer">
                        <div className="post-item__like" onClick={likePost}>
                            <BiLike />
                            <span>Th??ch</span>
                        </div>
                        <Link to={`/detail-post/${item._id}`} className="post-item__comment">
                            <GoComment/>
                            <span>B??nh lu???n</span>
                        </Link>
                        <div className="post-item__share" onClick={sharePost}>
                            <RiShareForwardLine/>
                            <span>Chia s???</span>
                        </div>
                    </div>

            </div>
            ))
        }
    </div>
  )
}

export default Post