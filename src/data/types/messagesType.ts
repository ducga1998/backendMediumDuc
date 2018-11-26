// import { connection } from 'mongoose';
const messageType = /* GraphQL */ `
    type message {
        idRoom: String
        idUser: String
        content : String
  }
  
  extend type Query {
    getAllMessageByIdRoom(id: String):[message] 
  }
  
`

export default messageType;