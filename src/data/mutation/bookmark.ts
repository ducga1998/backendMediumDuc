import { bookMark, unBookMark } from '../models/bookmark';
import { isAuth } from '../../help/help';
// input then data 
async function BookMark(a, { input }) {
    return await bookMark(input)
}
async function UnBookMark(id, { input }) {
    return await unBookMark(input)
}
export default {
    Mutation: {
        bookMark: isAuth(BookMark),
        unBookMark: isAuth(UnBookMark)
    }
}