import express from 'express'
import {
  commentonPost,
  deleteComment,
  deletePost,
  editCaption,
  getAllPosts,
  likeUnlikePost,
  newPost
} from '../controllers/postControllers.js'
import { isAuth } from '../middlewares/isAuth.js'
import uploadFile from '../middlewares/multer.js'

const router = express.Router()

router.post('/new', isAuth, uploadFile, newPost)
router.delete('/:id', isAuth, deletePost)
router.get('/all', isAuth, getAllPosts)
router.put("/:id", isAuth, editCaption);
router.post('/like/:id', isAuth, likeUnlikePost)
router.post('/like/:id', isAuth, likeUnlikePost)
router.post('/comment/:id', isAuth, commentonPost)
router.delete('/comment/:id', isAuth, deleteComment)

export default router
