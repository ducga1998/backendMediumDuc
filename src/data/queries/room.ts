
import { getAllRoom, getRoomByIdUser } from '../models/room'
async function GetRoomByIdUser(id: string) {
    return await getRoomByIdUser(id)
}
async function GetAllRoom(id: string) {
    return await getAllRoom()
}
export default {
    Query: {
        getRoomByIdUser: GetRoomByIdUser,
        getAllRoom: GetAllRoom
    }
}
