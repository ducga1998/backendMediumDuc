
import { getAllNotifiOfArticle, getAllNotifiOfUser } from '../models/notifcation'
import { isAuth } from '../../help/help';
async function GetAllNotifiOfArticle(id: string) {
    return await getAllNotifiOfArticle(id)
}
async function GetAllNotifiOfUser(request , {id ,first, offset }) {
    console.log('id user notification', id , first , offset)
    return await getAllNotifiOfUser(id , first  , offset)
}
export default {
    Query: {
        getAllNotifiOfArticle: isAuth(GetAllNotifiOfArticle),
        getAllNotifiOfUser: isAuth(GetAllNotifiOfUser)
    }
}
