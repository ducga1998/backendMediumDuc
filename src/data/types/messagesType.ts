// import { connection } from 'mongoose';
const messageType = /* GraphQL */ `
    type message {
        idUserReceive: String
        idUser: String
        contentMessage: String
        idCommunication:String
        userMessage : User
        
  }

  input MessageInput {
    idUserReceive : String
    contentMessage  : String
  }
  type Room {
    idCommunication:String
    idUser: String
  }
  extend type Mutation {
      addMessage(input: MessageInput): message
  }
  extend type Query {
    getAllMessageByIdUserReceive(id: String):[message] 
    getRoomChat(id: String): [message]
  }
  
`

export default messageType;