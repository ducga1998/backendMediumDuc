
import { checklogin, getAllInformationUser } from '../models/user';

async function GetAllInformationUser(input, { id }) {
    console.log('input.session', input.session)
    return await getAllInformationUser(id)
}
async function Checklogin(req, { username, password }, a) {
    // console.log(b)
    // return null
    console.log('req,session', req.session, a.session)
    a.session.pass = true
    return await checklogin(username, password)
}
async function Logout(input, { }, req) {
    if (req.session.pass) {
        req.session.pass = false
    }
}
export default {
    Query: {
        getAllInformationUser: GetAllInformationUser,
        checklogin: Checklogin,
        logout: Logout
    }
}
