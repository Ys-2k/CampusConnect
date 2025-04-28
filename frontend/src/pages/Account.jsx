import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { UserData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { PostData } from '../context/PostContext'
import PostCard from '../components/PostCard'
import Modal from '../components/Modal'
import axios from 'axios'
import { CiEdit } from 'react-icons/ci'
import toast from 'react-hot-toast'

const Account = () => {
  const { user } = UserData()
  const { posts, reels } = PostData()
  const navigate = useNavigate()
  const { logoutUser, followUser, updateProfilePic, updateProfileName } = UserData()

  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)

  const [followersData, setFollowersData] = useState([])
  const [followingsData, setFollowingsData] = useState([])

  async function followData () {
    try {
      const { data } = await axios.get('/api/user/followdata/' + user._id)

      setFollowersData(data.followers)
      setFollowingsData(data.followings)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    followData()
  }, [user])

  const logoutHandler = () => {
    logoutUser(navigate)
  }

  let myPosts
  if (posts) {
    myPosts = posts.filter(post => post.owner._id === user._id)
  }
  let myReels
  if (posts) {
    myReels = reels.filter(reel => reel.owner._id === user._id)
  }

  const [file, setFile] = useState('')

  const changeFileHandler = e => {
    const file = e.target.files[0]
    setFile(file)
  }

  const changleImageHandler = () => {
    const formdata = new FormData()

    formdata.append('file', file)

    updateProfilePic(user._id, formdata, setFile)
  }

  useEffect(() => {
    followData()
  }, [user])

  const [showInput, setShowInput] = useState(false)
  const [name, setName] = useState(user.name ? user.name : '')

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput)
  }

  const [showUpdatePass, setShowUpdatePass] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  async function updatePassword (e) {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/user/' + user._id, {
        oldPassword,
        newPassword
      })

      toast.success(data.message)
      setOldPassword('')
      setNewPassword('')
      setShowUpdatePass(false)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <SideBar />
      <section className='md:ml-[282px] mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529] flex-col  md:flex-row flex items-center justify-center md:justify-around'>
        {show && (
          <Modal value={followersData} title={'Followers'} setShow={setShow} />
        )}
        {show1 && (
          <Modal
            value={followingsData}
            title={'Followings'}
            setShow={setShow1}
          />
        )}
        <div>
          <div className='flex justify-center items-center text-white flex-col gap-5'>
            <img
              src={user.profilePic.url}
              alt=''
              className='w-32 h-32 object-cover rounded-full'
            />
            <div className='flex'>
              <input
                type='file'
                onChange={changeFileHandler}
                required
                className='block text-sm text-gray-700  
             rounded-lg cursor-pointer 
             focus:outline-none focus:ring-2 focus:ring-amber-500 
              file:py-1 file:px-1 md:file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-amber-100 file:text-black my-2
             hover:file:bg-amber-200 '
              />
              <button
                onClick={changleImageHandler}
                className='bg-blue-500 text-sm px-3 py-2 rounded-2xl'
              >
                Update Profile
              </button>
            </div>
          </div>
          <div className='text-white font-semibold text-xl my-3'>
            <h1 className='flex gap-2'>
              {showInput ? (
                <>
                  <div className='flex justify-center items-center gap-2'>
                    <input
                      className='custom-input'
                      style={{ width: '120px' }}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder='Enter Name'
                      required
                    />
                    <button
                      className='bg-blue-500 text-sm px-3 py-2 rounded-2xl'
                      onClick={UpdateName}
                    >
                      Update
                    </button>
                  </div>
                </>
              ) : (
                <p className='text-white font-semibold'>
                  {user.name}{' '}
                  <button onClick={() => setShowInput(true)}>
                    <CiEdit />
                  </button>
                </p>
              )}
            </h1>
            <h1 className='flex gap-2 text-gray-400 text-sm'>
              <span>{user.email}</span>
            </h1>

            <button
              onClick={() => setShowUpdatePass(!showUpdatePass)}
              className='bg-[#52b788] px-4 my-2 py-1 rounded-sm text-white'
            >
              {showUpdatePass ? 'X' : 'Update Password'}
            </button>

            {showUpdatePass && (
              <form
                onSubmit={updatePassword}
                className='flex text-sm justify-center flex-col  p-2 rounded-sm gap-4 border'
              >
                <input
                  type='password'
                  className='custom-input p-2'
                  placeholder='Old password'
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type='password'
                  className='custom-input p-2'
                  placeholder='new password'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type='submit'
                  className='bg-[#52b788] px-2 py-1 rounded-sm text-white'
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
        <div className='text-white text-center flex justify-between gap-8 text-2xl'>
          <div onClick={() => setShow(true)}>
            <span className='px-4 py-2 bg-[#52b788] rounded-full'>
              {user.followers ? user.followers.length : 0}
            </span>
            <h1 className='mt-2'>Followers</h1>
          </div>
          <div onClick={() => setShow1(true)}>
            <span className='px-4 py-2 bg-[#52b788] rounded-full'>
              {user.followings ? user.followings.length : 0}
            </span>
            <h1 className='mt-2'>Followings</h1>
          </div>
        </div>
        <div className='md:hidden mt-4'>
          <button
            className='text-white text-xl bg-red-500 py-1 px-2 rounded-lg'
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
      </section>

      <section className='flex gap-3 flex-col md:ml-[282px] text-white mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529]'>
        <h1 className='text-center font-bold text-2xl'>My Posts</h1>
        {myPosts && myPosts.length > 0 ? (
          myPosts.map(e => <PostCard value={e} key={e._id} type='post' />)
        ) : (
          <p>No Posts Yet!</p>
        )}

        {myReels && myReels.length > 0 ? (
          myReels.map(e => <PostCard value={e} key={e._id} type='reel' />)
        ) : (
          <p>No reels Yet!</p>
        )}
      </section>
    </>
  )
}

export default Account
