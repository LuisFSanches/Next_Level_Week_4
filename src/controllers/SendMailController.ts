import {Request, response, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import SendMailService from '../services/SendMailService'
import {resolve} from 'path';
class SendMailController{

  async execute(req:Request,res:Response){
    const {email, survey_id} = req.body

    //Repositories where we can get data from DB
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const checkUser = await usersRepository.findOne({email})

    if(!checkUser){
      return res.status(400).json({error:"User not found"})
    }

    const checkSurvey = await surveysRepository.findOne({id:survey_id})

    if(!checkSurvey){
      return response.status(400).json({
        error: "Survey does not exists"
      })
    }

    const variables = {
      name:checkUser.name,
      title:checkSurvey.title,
      description: checkSurvey.description,
      user_id:checkUser.id,
      link:process.env.URL_MAIL
    }

    const npsPath = resolve(__dirname, "..", "views", "emails","npsMail.hbs");


    //Check if the survery has already been created for specific user
    const checkSurveyUser = await surveysUsersRepository.findOne({
      where:[{user_id:checkUser.id}, {value:null}],
      relations:["user","survey"]
    })


    if(checkSurveyUser){
      await SendMailService.execute(email, checkSurvey.title, variables, npsPath )
      return res.json(checkSurveyUser)
    }

    //Save data into DB
    const surveyUser = await surveysUsersRepository.create({
      user_id: checkUser.id,
      survey_id
    })
    await surveysUsersRepository.save(surveyUser)


 

    //Send e-mail to user
    await SendMailService.execute(email, checkSurvey.title, variables, npsPath)
    return res.json(surveyUser)

  }
}

export {SendMailController}