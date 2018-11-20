import { getAllInfomationUserFollowYour } from '../models/follow';
async function GetAllInfomationUserFollowYour(a, { id }) {
    console.log("id user follow", id)
    return await getAllInfomationUserFollowYour(id)
}


export default {
    Query: {
        getAllInfomationUserFollowYour: GetAllInfomationUserFollowYour,
    }
}
