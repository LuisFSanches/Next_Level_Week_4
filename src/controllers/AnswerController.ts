import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
class AnswerController{

  //http://localhost:3333/answers/6?u=323754d9-4cc5-4d48-b54c-9615556e78a3
  /**
   * 
   * Route Params => Parametro que compõe a rota /
   * routes.get("/answers/:value")
   * 
   * Query Params => Busca, Paginacao, não obrigatórios ?
   * chave = valor
   * 
   */

  async execute(req:Request, res:Response){
    const {value} = req.params;
    const {u} = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    
    const checkSurveyUser = await surveysUsersRepository.findOne({
      id:String(u)
    })
    
    if(!checkSurveyUser){
      throw new AppError("Survey User does not exists!",400)
     
    }
    checkSurveyUser.value = Number(value)

    await surveysUsersRepository.save(checkSurveyUser)
    return res.json(checkSurveyUser)
  }
}
export { AnswerController };
