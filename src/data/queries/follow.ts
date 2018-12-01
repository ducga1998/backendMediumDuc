import { getAllInfomationUserFollowYour } from '../models/follow';
import { isAuth } from '../../help/help';
async function GetAllInfomationUserFollowYour(a, { id }) {
    console.log("id user follow", id)
    return await getAllInfomationUserFollowYour(id)
}


export default {
    Query: {
        getAllInfomationUserFollowYour: isAuth(GetAllInfomationUserFollowYour),
    }
}
