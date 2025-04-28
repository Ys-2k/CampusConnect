import React, { useState } from 'react'
import { PostData } from '../context/PostContext'
import { LoadingAnimation } from './Loading'

const AddPost = ({ types, posttype }) => {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState('')
  const [filePrev, setFilePrev] = useState('')

  const { addPost, addLoading } = PostData()

  const changeFileHandler = e => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setFilePrev(reader.result)
      setFile(file)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('caption', caption)
    formdata.append('file', file)
    addPost(formdata,  setFile, setFilePrev, setCaption, types)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className='text-white font-semibold text-2xl'>
          Create Post{' '}
          <small className='font-medium text-lg'>(with {posttype})</small>
        </h1>

        <textarea
          required
          type='text'
          className='w-full border border-white rounded h-20 text-white p-2'
          placeholder="What's on your mind?"
          value={caption}
          onChange={e => setCaption(e.target.value)}
        />
        <div className='flex justify-between items-center'>
          <input
            type='file'
            className='block text-sm text-gray-700  
             rounded-lg cursor-pointer 
             focus:outline-none focus:ring-2 focus:ring-amber-500 
              file:py-2 file:px-1 md:file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-amber-100 file:text-black my-2
             hover:file:bg-amber-200 w-1/2'
            accept={types == 'post' ? 'image/*' : 'video/*'}
            onChange={changeFileHandler}
            required
          />
          <button disabled={addLoading} className='bg-[#52b788] text-sm md:text-xl px-4 py-2 text-white cursor-pointer rounded'>
            {addLoading? (<LoadingAnimation/>) : ("Add Post")}
          </button>
        </div>
      </form>

      {filePrev && (
        <>
          {types == 'post' ? (
            <img src={filePrev} alt='' />
          ) : (
            <video
              controlsList='nodownload'
              controls
              src={filePrev}
              className='w-[300px] h-[450px]'
            />
          )}
        </>
      )}
    </div>
  )
}

export default AddPost
