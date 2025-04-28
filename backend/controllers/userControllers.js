import { User } from '../modals/userModal.js'
import TryCatch from '../utils/tryCatch.js'
import getDataUrl from '../utils/urlGenerator.js'
import cloudinary from 'cloudinary'
import bcrypt from 'bcrypt'
// GET /api/user/me
export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(user)
})

// GET /api/user/:id

export const userProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    return res
      .status(404)
      .json({ message: 'No user found with the provided ID' })
  }

  res.status(200).json(user)
})

// Follow Unfollow user

export const followUnfollow = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id)
  const loggedInUser = await User.findById(req.user._id)

  if (!user) {
    return res
      .status(404)
      .json({ message: 'No user found with the provided ID' })
  }
  if (user._id.toString() === loggedInUser._id.toString()) {
    return res.status(400).json({
      message: "You can't follow yourself"
    })
  }
  if (user.followers.includes(loggedInUser._id)) {
    const indexFollowing = loggedInUser.followings.indexOf(user._id)
    const indexFollower = user.followers.indexOf(loggedInUser._id)

    loggedInUser.followings.splice(indexFollowing, 1)
    user.followers.splice(indexFollower, 1)

    await loggedInUser.save()
    await user.save()

    res.json({
      message: 'User Unfollowed'
    })
  } else {
    loggedInUser.followings.push(user._id)
    user.followers.push(loggedInUser._id)

    await loggedInUser.save()
    await user.save()

    res.json({
      message: 'User Followed'
    })
  }
})

// User Followers data

export const userFollowerandFollowingData = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate('followers', '-password')
    .populate('followings', '-password')

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({
    followers: user.followers,
    followings: user.followings
  })
})

//  Update Profile

export const updateProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id)

  const { name } = req.body

  if (name) {
    user.name = name
  }

  const file = req.file
  if (file) {
    const fileUrl = getDataUrl(file)

    await cloudinary.v2.uploader.destroy(user.profilePic.id)

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content)

    user.profilePic.id = myCloud.public_id
    user.profilePic.url = myCloud.secure_url
  }

  await user.save()

  res.json({
    message: 'Profile updated'
  })
})

// Update password

export const updatePassword = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id)

  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: 'Please provide both old and new password.'
    })
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password)

  if (!isMatch) {
    return res.status(400).json({
      message: 'Wrong old password'
    })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: 'New password must be at least 6 characters long.'
    })
  }

  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()

  res.json({
    message: 'Password Updated'
  })
});


