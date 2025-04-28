import express from 'express'
import dotenv from 'dotenv'
// import { connectDB } from './database/db.js'
import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import { isAuth } from './middlewares/isAuth.js'
import { User } from './modals/userModal.js'
import { Chat } from './modals/ChatModel.js'
import mongoose from 'mongoose'
import { app, server } from "./socket/socket.js";

dotenv.config()

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_API,
  api_secret: process.env.Cloudinary_SECRETE
})

// const app = express()

// using middlewares
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT

app.get('/', (req, res) => {
  console.log('Root route hit')
  res.send('I am working!')
})

// to get all chats of user
app.get('/api/messages/chats', isAuth, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id
    }).populate({
      path: 'users',
      select: 'name profilePic'
    })

    chats.forEach(e => {
      e.users = e.users.filter(
        user => user._id.toString() !== req.user._id.toString()
      )
    })

    res.json(chats)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

// to get all users
app.get("/api/user/all", isAuth, async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Importing routes

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

// Using routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/messages', messageRoutes)

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://zakkibrazil:zmVHb00djiYTppNy@campusconnect.mbp7gze.mongodb.net/");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`)
  connectDB()
})
