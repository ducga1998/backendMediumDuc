// import { request } from 'supertest';

// this function auth use 
//  nhung cai nao can den admin thi them 1 doi so de check nua
export function isAuth(resolver , adminAuth = null) {
    return (request, args, context, info) => {
        const { user } = context.session
        // console.log('a', context.session.user)
     
        if (user) {
            const {decentraliz}  = user
            console.log('adminAuth',adminAuth ,decentraliz )
            // authecation 
            if(!adminAuth){
                return resolver(request, args, context, info)
            }
            // =>authzition 
            if(adminAuth  && adminAuth === decentraliz ){
              
                return resolver(request, args, context, info)
            }
            else {
                return null
            }
            //only user admin => access
          
           
        }
        return null

    }
}
export function filterStringHTML(str: any, flag: boolean = false): string {
    if (flag) {
        return str.replace(/<\/?[^>]+(>|$)/g, "")
    }
    return str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 10);
}
//() => () => function we want

