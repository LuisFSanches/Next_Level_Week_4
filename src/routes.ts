import express from 'express'
const routes = express.Router()
import {UserController} from './controllers/UserController'

const userController = new UserController()



routes.post('/new-user', userController.create)




export default routes