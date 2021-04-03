import {createConnection, Connection, getConnectionOptions} from 'typeorm'

export default async() : Promise<Connection> =>{
  //Takes all the information inside ormconfig.json
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    //Editing the database propertie inside the object
    Object.assign(defaultOptions, {
      database: 
      process.env.NODE_ENV === 'test' 
      ? "./src/database/database.test.sqlite" 
      : defaultOptions.database
    })
  )
}