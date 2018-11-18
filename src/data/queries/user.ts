import { getAllInformationUser, checklogin } from '../models/user'

async function GetAllInformationUser(id: string) {
    return await getAllInformationUser(id)
}
async function Checklogin(a, { username, password }) {
    // console.log(b)
    // return null
    console.log(username)
    return await checklogin(username, password)
}
export default {
    Query: {
        getAllInformationUser: GetAllInformationUser,
        checklogin: Checklogin
    }
}
