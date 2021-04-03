import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SurveysController{

  async create(req:Request, res:Response){
    const {title, description} = req.body

    //Repository allowing to use the typeORM properties such as (create, delete, find)
    const surveysRepository = getCustomRepository(SurveysRepository)

    const survey = surveysRepository.create({
      title,
      description
    })
    //Inserting survey data into database
    await surveysRepository.save(survey)

    return res.status(201).json(survey)
  }


  async show(req:Request, res:Response){
    //Repository allowing to use the typeORM properties such as (create, delete, find)
    const surveysRepository = getCustomRepository(SurveysRepository)

    const allSurveys = await surveysRepository.find()

    return res.json(allSurveys)
  }

}

export {SurveysController}