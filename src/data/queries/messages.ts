
import { getAllMessageByIdRoom } from '../models/message'
async function GetAllMessageByIdRoom(a, { id }) {
    return await getAllMessageByIdRoom(id)
}
export default {
    Query: {
        getAllMessageByIdRoom: GetAllMessageByIdRoom,
    }
}
