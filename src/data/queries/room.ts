
import {  getAllRoomById , } from '../models/room'
import { isAuth } from '../../help/help';
async function GetRoomById({request}, { id }) {
    const {idUser} = request.session.user
    return await getAllRoomById(idUser)
}
export default {
    Query: {
        getRoomById: isAuth(GetRoomById),
    }
}
