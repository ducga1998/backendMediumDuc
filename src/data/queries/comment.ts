import { getAllCommentInTheArticle } from '../models/comment';
async function GetAllCommentInTheArticle(a, { id }) {
    return await getAllCommentInTheArticle(id)
}
export default {
    Query: {
        getAllCommentInTheArticle: GetAllCommentInTheArticle,
    }
}
