import { getAllCommentInTheArticle } from '../models/comment';
import { isAuth } from '../../help/help';
async function GetAllCommentInTheArticle(request, { id , first , offset }) {
    console.log('GetAllCommentInTheArticle', id, first , offset )
    return await getAllCommentInTheArticle(id , first,  offset)
}
export default {
    Query: {
        getAllCommentInTheArticle: isAuth(GetAllCommentInTheArticle)
    }
}
