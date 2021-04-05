import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
class NPSController{

  async execute(req:Request, res:Response){
    const {survey_id} = req.params
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = surveyUsers.filter(
      (survey) => survey.value>=0 && survey.value <=6
      ).length

    const promoters = surveyUsers.filter(
      survey => survey.value >=9 && survey.value <=10
    ).length

    const passives =surveyUsers.filter(
      survey => survey.value>=7 && survey.value <=8
    ).length;

    const totalAnswers = surveyUsers.length

    const calculate = ((promoters - detractor)/totalAnswers)*100;

    return res.json({
      detractor,
      promoters,
      passives,
      totalAnswers,
      nps:calculate
    })


  }
}

export {NPSController}