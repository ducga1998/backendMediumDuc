import { getAllArticleHasBeenBookMark, isBookMark } from '../models/bookmark';
import { isAuth } from '../../help/help';
async function GetAllArticleHasBeenBookMark(a, { idUser }) {
    console.log('idUser', idUser)
    return await getAllArticleHasBeenBookMark(idUser)
}
async function IsBookMark(a, { idArticle, idUserBookMark }) {
    return await isBookMark({ idArticle, idUserBookMark })
}
export default {
    Query: {
        getAllArticleHasBeenBookMark: isAuth(GetAllArticleHasBeenBookMark),
        isBookMark: isAuth(IsBookMark)
    }
}
