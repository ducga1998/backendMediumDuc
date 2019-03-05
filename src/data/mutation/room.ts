
import { createRoom } from '../models/room';
import { isAuth } from '../../help/help';

async function CreateRoom({request}, { input }) {
    const {idUser} = request.session.user
    return await createRoom({...input, ...{idUser}})
}
export default {
    Mutation: {
        createRoom : isAuth(CreateRoom)
    }
}