
import { getAllMessageByIdRoom } from '../models/message'
import { isAuth } from '../../help/help';
async function GetAllMessageByIdRoom(a, { id }) {
    return await getAllMessageByIdRoom(id)
}
export default {
    Query: {
        getAllMessageByIdRoom: isAuth(GetAllMessageByIdRoom),
    }
}
