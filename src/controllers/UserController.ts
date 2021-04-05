import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'

class UserController {

  async create(req: Request, res:Response){
    const {name, email} = req.body

    const schema = yup.object().shape({
      name:yup.string().required(),
      email: yup.string().email().required()
    })

    if(!(await schema.isValid(req.body))){
     
      throw new AppError("Validation Failed")
    }

    //Repository allowing to use the typeORM properties such as (create, delete, find)
    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({email})

    if(userAlreadyExists){
      throw new AppError("User Already exists")
   
    }

    const user = usersRepository.create({
      name,
      email
    })
    //Inserting user data into database
    await usersRepository.save(user)
    
    return res.status(201).json(user)

  }

}
export { UserController }
