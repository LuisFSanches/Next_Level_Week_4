import express, { Router } from 'express'
const routes = express.Router()
import {UserController} from './controllers/UserController'
import {SurveysController} from './controllers/SurveysController'
import {SendMailController} from './controllers/SendMailController'

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailController = new SendMailController()



routes.post('/new-user', userController.create)
routes.post('/new-survey', surveyController.create)

routes.post("/sendMail", sendMailController.execute)

routes.get('/surveys', surveyController.show)




export default routes