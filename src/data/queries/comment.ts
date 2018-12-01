import { getAllCommentInTheArticle } from '../models/comment';
import { isAuth } from '../../help/help';
async function GetAllCommentInTheArticle(a, { id }) {
    return await getAllCommentInTheArticle(id)
}
export default {
    Query: {
        getAllCommentInTheArticle: isAuth(GetAllCommentInTheArticle)
    }
}
