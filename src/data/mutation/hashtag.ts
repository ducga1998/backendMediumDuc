

import { addHashtag, deleteHashTag } from '../models/hashtag';
async function AddHashtag(a, { input }) {
    return await addHashtag(input)
}
async function DeleteHashTag(id: string) {
    return await deleteHashTag(id)
}
export default {
    Mutation: {
        addHashtag: AddHashtag,
        deleteHashTag: DeleteHashTag
    }
}