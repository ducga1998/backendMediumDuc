// import { connection } from 'mongoose';
const roomType = /* GraphQL */ `
    type room {
        idRoom: String
        idUser: String
        idUserReceive: String
        messages : [Message]
        ownerUserInfo: User
        clientInfo: User
    }
    
    input inputRoom {
        idRoom: String
        idUser: String
        idUserReceive: String
    }
    extend type Mutation {
        createRoom(input:inputRoom) : room
    }
    extend type Query {
        getRoomById(id: String):[room] 
    }
  
`
export default roomType; 