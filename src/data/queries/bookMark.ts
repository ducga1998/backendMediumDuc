import { getAllBookMarkByIdUser, countBookMarkByIdArtice } from '../models/bookmark';
import { isAuth } from '../../help/help';
async function GetAllBookMarkByIdUser(a, { idUser }) {
    return await getAllBookMarkByIdUser(idUser)
}
async function CountBookMarkByIdArtice(a, { idArticle }) {
    return await countBookMarkByIdArtice(idArticle)
}
export default {
    Query: {
        getAllAricleByIdArticle: isAuth(GetAllBookMarkByIdUser),
        countBookMarkByIdArtice: isAuth(CountBookMarkByIdArtice)
    }
}
