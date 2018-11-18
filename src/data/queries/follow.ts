import { getAllInfomationUserFollowYour } from '../models/follow';
async function GetAllInfomationUserFollowYour(a, { input }) {
    return await getAllInfomationUserFollowYour(input)
}


export default {
    Query: {
        getAllInfomationUserFollowYour: GetAllInfomationUserFollowYour,
    }
}
