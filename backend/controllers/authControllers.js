import { User } from '../modals/userModal.js'
import generateToken from '../utils/generateToken.js'
import TryCatch from '../utils/tryCatch.js'
import getDataUrl from '../utils/urlGenerator.js'
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'

export const registerUser = TryCatch(async (req, res) => {
  const { name, password } = req.body
  const email = req.body.email.toLowerCase()
  const file = req.file

  if (!name || !email || !password || !file) {
    return res.status(400).json({
      message: 'Please fill the required fields!'
    })
  }

  // // Check if email ends with '.ac.uk'
  // if (!email.endsWith('ac.uk')) {
  //   return res.status(400).json({
  //     message: 'Only .ac.uk emails are allowed to register!'
  //   })
  // }

  let user = await User.findOne({ email })
  if (user) {
    return res.status(400).json({
      message: 'User already exists'
    })
  }

  const fileUrl = getDataUrl(file)
  const hashPassword = await bcrypt.hash(password, 10)

  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content)

  user = await User.create({
    name,
    email,
    password: hashPassword,
    profilePic: {
      id: myCloud.public_id,
      url: myCloud.secure_url
    }
  })

  generateToken(user._id, res)

  res.status(201).json({
    message: 'User Registered',
    user
  })
})

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body

  // Check if email ends with '.ac.uk'
  // if (!email.toLowerCase().endsWith('.ac.uk')) {
  //   return res.status(400).json({
  //     message: 'Only .ac.uk emails are allowed to login!'
  //   })
  // }

  const user = await User.findOne({ email: email.toLowerCase() })

  if (!user) {
    return res.status(404).json({
      message: 'Invalid Credentials'
    })
  }

  const comparePassword = await bcrypt.compare(password, user.password)
  if (!comparePassword) {
    return res.status(400).json({
      message: 'Invalid Credentials'
    })
  }

  generateToken(user._id, res)
  res.json({
    message: 'User Logged In',
    user
  })
})

export const logoutUser = TryCatch((req, res) => {
  res.cookie('token', '', { maxAge: 0 })

  res.json({
    message: 'Logged out successfully'
  })
})
