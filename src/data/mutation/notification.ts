import { addNotification } from '../models/notifcation'
async function AddNotification(notifcation: any) {
    // console.
    return await addNotification(notifcation);

}
export default {
    Mutation: {
        addNotification: AddNotification
    }
}