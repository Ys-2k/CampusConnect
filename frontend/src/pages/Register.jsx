import { useState } from 'react'
import sideImg from '../assets/images/sideImg.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext'
import { PostData } from '../context/PostContext'
import toast from 'react-hot-toast'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState('')
  const [filePrev, setFilePrev] = useState('')

  const { registerUser, loading } = UserData()
  const { fetchPosts } = PostData()

  const changeFileHandler = e => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setFilePrev(reader.result)
      setFile(file)
    }
  }

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()


    if (!email.toLowerCase().endsWith('.ac.uk')) {
      console.log("here",email.toLowerCase())
      toast.error('Only .ac.uk emails are allowed!')
      return // ⛔ stop the form here
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('file', file)

    registerUser(formData, navigate, fetchPosts)
  }

  return (
    <>
      {loading ? (
        <>Loading</>
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
              <h2 className='text-2xl font-bold  text-center uppercase'>
                Campus<span className='text-[#52b788]'>Connect</span>
              </h2>
              <h4 className='mb-6 text-2xl text-center font-bold bg-[#52b788]'>
                Register Now
              </h4>
              <div className=' flex justify-center'>
                {filePrev && (
                  <img
                    src={filePrev}
                    className='w-[80px] h-[80px] rounded-full'
                    alt=''
                  />
                )}
              </div>
              <div className='mb-2'>
                <label className='block text-sm font-medium mb-2'>Email</label>
                <input
                  type='email'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full p-2 bg-white text-black rounded'
                  placeholder='joe@domain.ac.uk'
                />
              </div>
              <div className='mb-2'>
                <label className='block text-sm font-medium mb-2'>
                  Username
                </label>
                <input
                  type='text'
                  required
                  value={name}
                  onChange={e => setName(e.target.value) }
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
              <div className='mb-2'>
                <label className='block text-sm font-medium mb-2'>
                  Add a profile picture
                </label>

                <div className='w-full border border-gray-300 rounded px-3 py-2  text-gray-300 cursor-pointer hover:border-green-200 transition duration-200'>
                  <input
                    required
                    onChange={changeFileHandler}
                    type='file'
                    accept='image/*'
                    className='w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:text-sm file:font-semibold
        file:bg-white file:text-black
        hover:file:bg-green-300'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='w-full second-color cursor-pointer text-white py-2 rounded hover:bg-green-700'
              >
                Sign up
              </button>

              <div className='mt-2 text-center'>
                <small>
                  <span>Already have an account? </span>
                  <Link to='/login' className='text-[#52b788]'>
                    Sign In
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

export default Register
