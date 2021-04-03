import express from 'express'
const routes = express.Router()
import {UserController} from './controllers/UserController'
import {SurveysController} from './controllers/SurveysController'

const userController = new UserController()
const surveyController = new SurveysController()



routes.post('/new-user', userController.create)
routes.post('/new-survey', surveyController.create)

routes.get('/surveys', surveyController.show)




export default routes