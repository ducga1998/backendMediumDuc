// import { request } from 'supertest';

import { checklogin, getAllInformationUser } from '../models/user';
import { isAuth } from '../../help/help';

async function GetAllInformationUser(input, { id }) {
    console.log('input.session', input.session)
    return await getAllInformationUser(id)
}
async function Checklogin({ request }, { username, password }, session) {

    // console.log('req,session', req.session, a.session)
    // a.session.pass = true
    console.log(request)
    return await checklogin(username, password, request)
}
async function Logout({ request }, { }, ) {

    delete request.session.user
    console.log('request.session', request.session)
    // if (req.session.pass) {
    //     req.session.pass = false
    // }
    return {}
}
export default {
    Query: {
        getAllInformationUser: isAuth(GetAllInformationUser),
        checklogin: Checklogin,
        logout: isAuth(Logout)
    }
}
