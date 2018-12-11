import { isAuth } from '../../help/help';
import { addRelyComment } from '../models/replyComment';
async function AddRelyComment(a, { input }) {
    return await addRelyComment(input)
}
export default {
    Mutation: {
        addRelyComment: isAuth(AddRelyComment),
    }
}