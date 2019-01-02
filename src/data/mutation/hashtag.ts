

import { addHashtag, deleteHashTag } from '../models/hashtag';
import { isAuth } from '../../help/help';
async function AddHashtag(a, { input }) {
    return await addHashtag(input)
}
async function DeleteHashTag(id: string) {
    return await deleteHashTag(id)
}
export default {
    Mutation: {
        addHashtag: isAuth(AddHashtag),
        deleteHashTag: isAuth(DeleteHashTag)
    }
}
