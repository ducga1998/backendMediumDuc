
import { getAllNotifiOfArticle, getAllNotifiOfUser } from '../models/notifcation'
import { isAuth } from '../../help/help';
async function GetAllNotifiOfArticle(id: string) {
    return await getAllNotifiOfArticle(id)
}
async function GetAllNotifiOfUser(id: string) {
    return await getAllNotifiOfUser(id)
}
export default {
    Query: {
        getAllNotifiOfArticle: isAuth(GetAllNotifiOfArticle),
        getAllNotifiOfUser: isAuth(GetAllNotifiOfUser)
    }
}
