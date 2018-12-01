
import { getAllRoom, getRoomByIdUser } from '../models/room'
import { isAuth } from '../../help/help';
async function GetRoomByIdUser(input, { id }) {
    return await getRoomByIdUser(id)
}
async function GetAllRoom(id: string) {
    return await getAllRoom()
}
export default {
    Query: {
        getRoomByIdUser: isAuth(GetRoomByIdUser),
        getAllRoom: isAuth(GetAllRoom)
    }
}
