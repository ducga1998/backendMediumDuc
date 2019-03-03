
import { getAllMessageByIdUserReceive, getRoomChat } from '../models/message'
import { isAuth } from '../../help/help';
async function GetAllMessageByIdUserReceive({request}, { id }) {
    console.log('id',id)
    const { idUser }  = request.session.user 
    return await getAllMessageByIdUserReceive(id)
}
async function GetRoomChat({request}, { id }) {
    const { idUser }  = request.session.user 
    console.log('idUser in get room chat' ,idUser , id )
    // id is idCommunication
    return await getRoomChat(idUser , id)
}

export default {
    Query: {
        getAllMessageByIdUserReceive: isAuth(GetAllMessageByIdUserReceive),
        getRoomChat : isAuth(GetRoomChat)
    }
}
