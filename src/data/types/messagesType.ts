// import { connection } from 'mongoose';
const messageType = /* GraphQL */ `
    type Message {
        idUserReceive: String
        idUser: String
        contentMessage: String
        nameUserReveice:String
        ownerUserInfo : User
    }

  input MessageInput {
    idRoom : String
    contentMessage  : String
  }
  type Room {
    idRoom:String
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