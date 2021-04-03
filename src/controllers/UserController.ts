import {Request, Response} from 'express'
import { getRepository } from 'typeorm'
import {User} from '../models/User'

class UserController {

  async index(req: Request, res:Response){

  }
  async create(req: Request, res:Response){
    const {name, email} = req.body

    //Repository allowing to use the typeORM properties such as (create, delete, find)
    const usersRepository = getRepository(User)

    const userAlreadyExists = await usersRepository.findOne({email})

    if(userAlreadyExists){
      return res.status(400).json({
        error:"User Already exists"
      })
    }

    const user = usersRepository.create({
      name,
      email
    })
    //Inserting user data into database
    await usersRepository.save(user)
    
    return res.json(user)

  }
  async update(req: Request, res:Response){

  }
  async delete(req: Request, res:Response){

  }
}
export {UserController}