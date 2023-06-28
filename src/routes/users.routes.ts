import { Router } from 'express'
import * as uRouter from '../controllers/users.controller'

const userRoutes = Router()

userRoutes.get('/', uRouter.getUsers)
userRoutes.get('/:id', uRouter.getUser)
userRoutes.post('/', uRouter.createUser)
userRoutes.patch('/:id', uRouter.updateUser)
userRoutes.patch('/:id/follow/:fol', uRouter.followUser)
userRoutes.delete('/:id', uRouter.deleteUser)

export default userRoutes