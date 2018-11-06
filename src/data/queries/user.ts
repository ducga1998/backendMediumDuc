import { getAllInformationUser } from '../models/user'

async function GetAllInformationUser(id: string) {
    return await getAllInformationUser(id)
}

export default {
    Query: {
        getAllInformationUser: GetAllInformationUser,
    }
}
