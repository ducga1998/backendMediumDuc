
import { deleteUserById, updateInfomationUser, addNewUser, UserType } from '../models/user'
async function DeleteUserById(id: string) {
    return await deleteUserById(id)
}
async function UpdateInfomationUser(data, { input }: { input: UserType }) {
    return await updateInfomationUser(input)
}
async function AddNewUser(data: UserType, { input }: { input: UserType }, b, c) {
    // console.log(input), console.log(c)
    return await addNewUser(input)
}
export default {
    Mutation: {
        deleteUserById: deleteUserById,
        updateInfomationUser: UpdateInfomationUser,
        addNewUser: AddNewUser
    }
}