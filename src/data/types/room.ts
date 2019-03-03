// import { connection } from 'mongoose';
const roomType = /* GraphQL */ `
    type room {
        idRoom: String
        idUser: String
        connections: [connectionType]
        title: String
  }
  type connectionType {
      idUser: String
      socketid:String
  }
  extend type Query {
    getRoomByIdUser(id: String):[room] 
    getAllRoom(id: String): JSON
    
  }
  
`
export default roomType; 