// import { session } from 'express-session';

import { deleteUserById, updateInfomationUser, addNewUser, UserType } from '../models/user'
import { isAuth } from '../../help/help';
async function DeleteUserById(data , {id}) {
    console.log('id user delete',id)
    return await deleteUserById(id)
}
async function UpdateInfomationUser(data, { input }) {
    console.log('UpdateInfomationUser', input)
    return await updateInfomationUser(input)
}
async function AddNewUser(data: any, { input }: { input: UserType }, b, c) {
    console.log(data.session)
    // console.log(input), console.log(c)
    return await addNewUser(input)
}
export default {
    Mutation: {
        deleteUserById: isAuth(DeleteUserById , 3),
        updateInfomationUser: isAuth(UpdateInfomationUser),
        addNewUser: AddNewUser
    }
}