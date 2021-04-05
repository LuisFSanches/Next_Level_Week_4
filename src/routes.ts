import express, { Router } from 'express'
const routes = express.Router()
import {UserController} from './controllers/UserController'
import {SurveysController} from './controllers/SurveysController'
import {SendMailController} from './controllers/SendMailController'
import { AnswerController } from './controllers/AnswerController'
import { NPSController } from './controllers/NPSController'

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailController = new SendMailController()
const anserController = new AnswerController()
const npsController = new NPSController()


routes.post('/new-user', userController.create)
routes.post('/new-survey', surveyController.create)

routes.post("/sendMail", sendMailController.execute)

routes.get('/surveys', surveyController.show)

routes.get('/answers/:value', anserController.execute)

routes.get('/nps/:survey_id', npsController.execute)


export default routes