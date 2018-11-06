import { addNotification } from '../models/notifcation'
async function AddNotification(notifcation: any) {
    return await addNotification(notifcation);
}
export default {
    Mutation: {
        addNotification: AddNotification
    }
}