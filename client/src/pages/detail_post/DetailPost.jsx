import React, {useContext,useState,useEffect,useRef} from 'react';
import { GlobalState } from '../../GlobalState';
import { useParams,Link,useNavigate } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import axios from 'axios';
import Modal ,{ ModalContent} from '../../components/modal/Modal';
import Button from '../../components/button/Button';
import '../posts/post.scss';


const initialStatePost = {
    text : ''
}

const initialStateComment = {
    text : ''
}


const DetailPost = () => {

    const {id} = useParams();
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [posts] = state.postsAPI.posts;
    const [callback,setCallback] = state.postsAPI.callback;
    const [user] = state.userAPI.user;

    const [post,setPost] = useState(initialStatePost);
    const [comment,setComment] = useState(initialStateComment);

    const [onEdit,setOnEdit] = useState(false);
    const [onEditCM,setOnEditCM] = useState(false);
    const [postID,setPostID] = useState('');
    const [commentID,setCommentID] = useState('');
    const [detailPost,setDetailPost] = useState([]);

    const inputCommentRef = useRef(null);
    const boxEditPostRef = useRef(null);
    let history = useNavigate();




    useEffect(() => {
        const getDetail = async () => {
          try {
            const result = await posts.find(item => item._id === id ) ; 
            setDetailPost(result);
            window.scrollTo(0,0);
          } catch (error) {
            // console.log(error);
          }
        }
        getDetail();
    
      },[id,posts])

    useEffect(() => {
        const buttonThreeDotsComment = document.querySelectorAll('.icon-threedot-comment');
        const boxEditComments = document.querySelectorAll('.box-edit__comment');

        // console.log(buttonThreeDotsComment);
        buttonThreeDotsComment.forEach(dot => {    
            dot.onclick = () => {
                const dot_id = dot.getAttribute('data-id');
                boxEditComments.forEach((box) => {
                    const box_id = box.getAttribute('data-id');
                    if(box_id === dot_id) {
                        box.classList.toggle('active')
                    //    console.log(box);
                    }
                })
            }
        });
    })

    const closeBoxEdiComment = () => {
        const boxEditComments = document.querySelectorAll('.box-edit__comment');

        boxEditComments.forEach((box) => {
            box.classList.remove('active')
        })
    }

    const openPostArticles = () => {
        const modal = document.querySelector('#modal-post');
        
        modal.classList.toggle('active');
    }

    const openBoxThreeDot = () => {
        boxEditPostRef.current.classList.toggle('active');
    }


    const handlePostInput = e => {
        const {name,value} = e.target ;
        setPost({...post , [name]:value})
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
            history("../posts");
            setCallback(!callback);

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const editPosts = (post_id) => {
        setOnEdit(true);
        setPostID(post_id);
        openPostArticles();
        openBoxThreeDot();
    }

    const handleCommentInput = e => {
        const {name,value} = e.target ;
        setComment({...comment , [name]:value})
    }

    const commentPost = async (e,post_id) => {
        e.preventDefault()
        try {

            if(onEditCM) {
                await axios.put(`/api/post/comment/${post_id}/${commentID}`, {...comment}, {
                    headers: {Authorization: token}
                })
            }
            else {
                await axios.post(`/api/post/comment/${post_id}`, {...comment}, {
                    headers: {Authorization: token}
                })
            }

            setOnEditCM(false)
            setComment(initialStateComment)
            setCallback(!callback);

            // console.log(post_id,{...comment});

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const deleteComment = async (post_id ,comment_id) => {
        try {
            await axios.delete(`/api/post/comment/${post_id}/${comment_id}`, {
                headers: {Authorization: token}
            })
            setCallback(!callback);

        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    const editComment = (post_id,comment_id) => {
        setOnEditCM(true);
        setPostID(post_id);
        setCommentID(comment_id);
        closeBoxEdiComment();
        onInpuComment();
    }

    const closeBoxEditPost = () => {
        boxEditPostRef.current.classList.remove('active')
     
    }
    const onInpuComment = () => {
        inputCommentRef.current.focus();
    }

    // console.log(id,detailPost);

    if(Array.isArray(detailPost) === true) {
        return null
      } 
      //! khi chay lan dau if detail array => return null 
    
      if(detailPost === undefined) return null
      // ! khi ta f5 web if detail === undefined => return null

  return (
    <div className="post">

        <div className="post-item" >
            <div className="post-item__user">
                <p>{detailPost.name.substring(0,1)}</p>
                <span>{detailPost.name}</span>
            </div>
            <div className="post-item__threedot">
                <div className="icon-threedot" onClick={openBoxThreeDot}>
                            <BsThreeDots />
                </div> 
                <div className="box-edit__box" ref={boxEditPostRef}>
                {
                    detailPost.user === user._id ? 
                    <p onClick={() => editPosts(detailPost._id)}>chỉnh sửa</p> : null
                }
                {   detailPost.user === user._id ? 
                    <p onClick={() => deletePosts(detailPost._id)}>xóa</p> : null
                }

                <p onClick={closeBoxEditPost}>thoát</p>
                      
                </div>
            </div>
            <Link to={`/detail-post/${detailPost._id}`} className="post-item__text">
                {detailPost.text}
            </Link>

            <div className="post-item__footer">
                <div className="post-item__like">
                    <BiLike />
                    <span>Thích</span>
                </div>
                <div className="post-item__comment" onClick={onInpuComment}>
                    <GoComment/>
                    <span>Bình luận</span>
                </div>
                <div className="post-item__share">
                            <RiShareForwardLine/>
                    <span>Chia sẻ</span>
                </div>
            </div>

        <div className="comment">
            <form action="" onSubmit={(e) => commentPost(e,detailPost._id)}>

                {user && <p>{user.name.substring(0,1)}</p>}
                <textarea type="text" id='text' name='text' ref={inputCommentRef} required
                    value={comment.text} onChange={handleCommentInput}  placeholder='Bình luận của bạn là j'
                />
                <Button size={'sm-1'} type='submit'> {onEditCM ? "Edit" : "Enter"}</Button>


            </form>
                {
                 detailPost.comments.map((comment,index) => (
                    <div className="comment-item" key={index}>
                        {user && <span>{user.name.substring(0,1)}</span>}

                        <div className="comment-item__content">
                            {user && <span>{user.name}</span>}
                            <p>{comment.text}</p>

                            <div className="comment-item__threedot">
                                <div className="icon-threedot-comment" data-id={comment._id}>
                                        <BsThreeDots />
                                </div> 
                                <div className="box-edit__comment" data-id={comment._id}>
                                {
                                    detailPost.user === user._id ? 
                                    <p onClick={() => editComment(detailPost._id , comment._id)}>chỉnh sửa</p> : null
                                }
                                {   detailPost.user === user._id ? 
                                    <p onClick={() => deleteComment(detailPost._id , comment._id)}>xóa</p> : null
                                }
                                
                                <p onClick={closeBoxEdiComment}>thoát</p>
                    
                                    
                                </div>
                            </div>
                            
                        </div>

                    </div>
                ))
                }           
        </div>
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

    </div>
  )
}

export default DetailPost