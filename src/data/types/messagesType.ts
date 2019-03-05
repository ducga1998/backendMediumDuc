// import { connection } from 'mongoose';
const messageType = /* GraphQL */ `
    type Message {
        idUserReceive: String
        idUser: String
        contentMessage: String
        idCommunication:String
        userMessage : User
        nameUserReveice:String
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
      addMessage(input: MessageInput): Message
  }
  extend type Query {
    getAllMessageByIdUserReceive(id: String):[Message] 
    getRoomChat(id: String): [Message]
  }
  
`

export default messageType;