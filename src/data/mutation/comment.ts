import { isAuth } from '../../help/help';
import { addCommentIntoArticle  } from '../models/comment';
async function AddCommentIntoArticle(a, { input }) {
    return await addCommentIntoArticle(input)
}
// async function AddReplyComment(a, { input }) {
//     const {idRely , comment} = input
//     return await addReplyComment()
// }
export default {
    Mutation: {
        addCommentIntoArticle: isAuth(AddCommentIntoArticle),
    }
}