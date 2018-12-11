// import { connection } from 'mongoose';
const replyType = /* GraphQL */ `
    type Rely {
        idRely: String 
        idComment: String
    }
    input RelyInput {
        idRely: String 
        idComment: String
    }
    
    extend type Mutation {
        addRelyComment(input:RelyInput):Rely
    } 
`
export default replyType;
// =>  add comment  and reply