
import { getAllNotifiOfArticle, getAllNotifiOfUser } from '../models/notifcation'
async function GetAllNotifiOfArticle(id: string) {
    return await getAllNotifiOfArticle(id)
}
async function GetAllNotifiOfUser(id: string) {
    return await getAllNotifiOfUser(id)
}
export default {
    Query: {
        getAllNotifiOfArticle: GetAllNotifiOfArticle,
        getAllNotifiOfUser: GetAllNotifiOfUser
    }
}
