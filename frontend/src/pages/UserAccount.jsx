import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { UserData } from '../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { PostData } from '../context/PostContext'
import PostCard from '../components/PostCard'
import axios from 'axios'
import Loading from '../components/Loading'
import Modal from '../components/Modal'

const UserAccount = () => {
  const { user: loggedInUser } = UserData()
  const navigate = useNavigate()

  const { posts, reels } = PostData()

  const [user, setUser] = useState([])

  const params = useParams()

  const [loading, setLoading] = useState(true)

  async function fetchUser () {
    try {
      const { data } = await axios.get('/api/user/' + params.id)

      setUser(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  console.log(user)

  useEffect(() => {
    fetchUser()
  }, [params.id])

  let myPosts

  if (posts) {
    myPosts = posts.filter(post => post.owner._id === user._id)
  }
  let myReels

  if (reels) {
    myReels = reels.filter(reel => reel.owner._id === user._id)
  }

  const [followed, setFollowed] = useState(false)

  const { followUser } = UserData()

  const handleFollow = () => {
    setFollowed(!followed)
    followUser(user._id, fetchUser)
  }

  const followers = user.followers

  useEffect(() => {
    if (followers && followers.includes(loggedInUser._id)) setFollowed(true)
  }, [user])

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
  return (
    <>
      <SideBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className='md:ml-[282px] mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529] flex-col  md:flex-row flex items-center justify-center md:justify-around'>
            {show && (
              <Modal
                value={followersData}
                title={'Followers'}
                setShow={setShow}
              />
            )}
            {show1 && (
              <Modal
                value={followingsData}
                title={'Followings'}
                setShow={setShow1}
              />
            )} 

            <div>
              <img
                src={user.profilePic.url}
                alt=''
                className='w-32 rounded-full'
              />
              <div className='text-white font-semibold text-xl my-3'>
                <h1 className='flex gap-2'>
                  <span>{user.name}</span>
                </h1>
                <h1 className='flex gap-2'>
                  <span>{user.email}</span>
                </h1>
              </div>
              .
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
            {user._id === loggedInUser._id ? (
              ''
            ) : (
              <button
                onClick={handleFollow}
                className={`py-2 ${
                  followed ? 'bg-red-500' : 'bg-[#52b788]'
                } px-5 text-white mt-5 rounded-lg cursor-pointer`}
              >
                {followed ? 'UnFollow' : 'Follow'}
              </button>
            )}
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
      )}
    </>
  )
}

export default UserAccount
