import React, { useEffect, useState } from 'react'
import { BsChatFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import SimpleModal from './SimpleModal'
import toast from 'react-hot-toast'
import { LoadingAnimation } from './Loading'
import axios from 'axios'

const PostCard = ({ type, value }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')

  const { user } = UserData()
  const { likePost, addComment, deletePost, loading, fetchPosts } = PostData()

  const formatDate = format(new Date(value.createdAt), 'MMM do')

  console.log(value)
  useEffect(() => {
    for (let i = 0; i < value.likes.length; i++) {
      if (value.likes[i] === user._id) setIsLiked(true)
    }
  }, [value, user._id])

  const likeHandler = () => {
    setIsLiked(!isLiked)
    likePost(value._id)
  }

  const addCommentHandler = e => {
    e.preventDefault()
    addComment(value._id, comment, setComment, setShow)
  }

  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

  const deleteHandler = () => {
    deletePost(value._id)
  }

  const [showInput, setShowInput] = useState(false)
  const editHandler = () => {
    setShowModal(false)
    setShowInput(true)
  }

  const [caption, setCaption] = useState(value.caption ? value.caption : '')
  const [captionLoading, setCaptionLoading] = useState(false)

  async function updateCaption () {
    setCaptionLoading(true)
    try {
      const { data } = await axios.put('/api/post/' + value._id, { caption })

      toast.success(data.message)
      fetchPosts()
      setShowInput(false)
      setCaptionLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setCaptionLoading(false)
    }
  }

  return (
    <div className='p-5 bg-[#161616] rounded-2xl shadow-2xl'>
      <SimpleModal isOpen={showModal} onClose={closeModal}>
        <div className='flex  items-center justify-between gap-3'>
          <button
            onClick={editHandler}
            className='bg-[#52b788] text-white py-1 px-3 rounded-md'
          >
            Edit
          </button>
          <button
            onClick={deleteHandler}
            className='bg-red-400 text-white py-1 px-3 rounded-md'
            disabled={loading}
          >
            {loading ? <LoadingAnimation /> : 'Delete'}
          </button>
        </div>
      </SimpleModal>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Link to={`/user/${value.owner._id}`}>
            <img
              src={value.owner.profilePic.url}
              className='w-8 h-8 rounded-full'
              alt=''
            />
          </Link>
          <div className='text-white flex flex-col'>
            <p className='text-sm'>{value.owner.name}</p>
            <small>{formatDate}</small>
          </div>
        </div>
        {value.owner._id === user._id && (
          <div className=' text-white'>
            <button
              onClick={() => setShowModal(true)}
              className='cursor-pointer text-2xl'
            >
              <BsThreeDotsVertical />{' '}
            </button>
          </div>
        )}
      </div>

      <div className='my-2 text-white'>
        {showInput ? (
          <>
            <input
              className='custom-input'
              style={{ width: '150px' }}
              type='text'
              placeholder='Enter Caption'
              value={caption}
              onChange={e => setCaption(e.target.value)}
              required
            />
            <button
              onClick={updateCaption}
              className='text-sm text-white px-1 py-1 rounded-md bg-[#18c34b]'
              disabled={captionLoading}
            >
              {captionLoading ? <LoadingAnimation /> : 'Update Caption'}
            </button>
          </>
        ) : (
          <p>{value.caption}</p>
        )}
      </div>

      <div className='my-2'>
        {type == 'post' ? (
          <img
            src={value.post.url}
            alt=''
            className='w-full h-[600px] object-cover rounded'
          />
        ) : (
          <video
            src={value.post.url}
            alt=''
            muted
            autoPlay
            controls
            className='w-full h-[400px] object-cover rounded'
          />
        )}
      </div>

      <div className='flex items-center justify-between text-white'>
        <div className='flex items-center space-x-2'>
          <span
            className='text-red-500 cursor-pointer text-2xl'
            onClick={likeHandler}
          >
            {' '}
            {isLiked ? <FaHeart /> : <FaRegHeart className='text-white' />}{' '}
          </span>
          <button>{value.likes.length} Likes</button>
        </div>
        <button
          onClick={() => setShow(!show)}
          className='flex justify-center items-center gap-2 '
        >
          <BsChatFill />
          <span>{value.comments.length} comments</span>
        </button>
      </div>
      {show && (
        <form className='flex my-2 gap-2'>
          <input
            type='text'
            className='w-full px-2 py-1 rounded-2xl bg-[#343a40] outline-0 text-white'
            placeholder='Enter a comment'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button
            onClick={addCommentHandler}
            className='bg-[#fff] px-5 py-1 cursor-pointer rounded-2xl'
          >
            Add
          </button>
        </form>
      )}
      <hr className='my-2 bg-white text-white' />
      <p className='text-white font-semibold'>Comments</p>
      <hr className='my-2 bg-white text-white' />
      <div className='my-4'>
        <div className='text-white max-h-[200px] overflow-y-auto'>
          {value.comments && value.comments.length > 0 ? (
            value.comments.map(e => (
              <Comment value={e} user={user} key={e._id} owner={value.owner._id} id={value._id} />
            ))
          ) : (
            <p className='text-gray-400'>No comments</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCard

export const Comment = ({ value, user, owner, id }) => {

  const {deleteComment} = PostData();

  const deleteHandleComment = ()=>{
    deleteComment(id ,value._id);
  }

  return (
    <div className='flex items-center space-x-2 mt-1'>
      <Link to={`/user/${value.user._id}`}>
        <img
          className='w-8 h-8 rounded-full'
          src={value.user.profilePic.url}
          alt=''
        />
      </Link>
      <div className='flex justify-between w-full'>
        <div>
          <p className='text-white'>{value.user.name}</p>
          <p className='text-gray-300 text-sm'>{value.comment}</p>
        </div>
        {owner === user._id ? (
          ''
        ) : (
          <>
            {value.user._id === user._id && (
              <button onClick={deleteHandleComment} className='text-red-500 cursor-pointer'>
                <MdDelete />
              </button>
            )}
          </>
        )}

        {owner === user._id && (
          <button onClick={deleteHandleComment} className='text-red-500 cursor-pointer'>
            <MdDelete />
          </button>
        )}
      </div>
    </div>
  )
}
