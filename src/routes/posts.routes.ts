import { Router } from 'express'
import * as pRouter from '../controllers/posts.controller'

const postRouter = Router()

postRouter.get('/', pRouter.getPosts)
postRouter.get('/:id', pRouter.getPost)
//postRouter.post('/', pRouter.createPost)
//postRouter.patch('/:id', pRouter)
//postRouter.delete('/:id', pRouter)

export default postRouter