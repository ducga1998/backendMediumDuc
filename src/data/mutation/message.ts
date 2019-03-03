import { isAuth } from '../../help/help';
import { addMessage} from '../models/message'
async function AddMessage({request} , {input} ) {
    // console.
   const {idUser }  = request.session.user 
    return await addMessage({...input , ...{idUser}});

}
export default {
    Mutation: {
        addMessage: isAuth(AddMessage)
    }
}