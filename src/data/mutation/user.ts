
import { deleteUserById, updateInfomationUser, addNewUser, UserType } from '../models/user'
async function DeleteUserById(id: string) {
    return await deleteUserById(id)
}
async function UpdateInfomationUser(input: UserType) {
    return await updateInfomationUser(input)
}
async function AddNewUser(input: UserType) {
    return await addNewUser(input)
}
export default {
    Mutation: {
        deleteUserById: deleteUserById,
        updateInfomationUser: UpdateInfomationUser,
        addNewUser: AddNewUser
    }
}