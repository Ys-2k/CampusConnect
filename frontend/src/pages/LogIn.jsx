import { useState } from 'react'
import sideImg from '../assets/images/sideImg.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'
import Loading from '../components/Loading'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { loginUser, loading } = UserData()
  const { fetchPosts } = PostData();

  const handleSubmit = e => {
    e.preventDefault()
    loginUser(email, password, navigate, fetchPosts)
  }

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <div className='h-screen flex bg-color text-white'>
          {/* Left side image */}
          <div className='w-1/2 md:block hidden h-full'>
            <img
              src={sideImg}
              alt='Side visual'
              className='w-full h-full object-cover'
            />
          </div>

          {/* Right side form */}
          <div className='md:w-1/2 w-full flex items-center justify-center'>
            <form
              onSubmit={handleSubmit}
              className='p-8 rounded-lg w-3/4 max-w-md'
            >
              <h2 className='text-2xl font-bold text-center uppercase'>
                Campus<span className='text-[#52b788]'>Connect</span>
              </h2>
              <h4 className='mb-6 text-2xl text-center font-bold bg-[#52b788]'>
                Connect Now
              </h4>

              <div className='mb-2'>
                <label className='block text-sm font-medium mb-2'>
                  Email
                </label>
                <input
                  type='text'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full p-2 bg-white text-black rounded'
                  placeholder='joe random'
                />
              </div>
              <div className='mb-2'>
                <label className='block text-sm font-medium mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full p-2 bg-white text-black rounded'
                  placeholder='Enter your password'
                />
              </div>

              <button
                type='submit'
                className='w-full font-semibold second-color cursor-pointer text-white py-2 rounded mt-2 hover:bg-green-700'
              >
                Login
              </button>

              <div className='mt-2 text-center'>
                <small>
                  <span>Don't have an account? </span>
                  <Link to='/register' className='text-[#52b788]'>
                    Sign up
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default LogIn
