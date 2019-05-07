// import { request } from 'supertest';

// this function auth use 
//  nhung cai nao can den admin thi them 1 doi so de check nua
export function isAuth(resolver , adminAuth = null) {
    return (request, args, context, info) => {
        const { userLogin } = context.session
        // console.log('a', context.session.userLogin)
     
        if (userLogin) {
            const {decentraliz}  = userLogin
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
            //only userLogin admin => access
          
           
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
export function allFiler(arr , finalMess = []   ){
    if( arr.length === 0){
        return finalMess
    }
    // mang ko co idCommnucation o nua w tren
    const  arrTest =  arr.filter(item =>  item.idCommnucation === arr[0].idCommnucation )
    finalMess.push(arrTest.pop())
    const totalArr = arr.filter( item => item.idCommnucation !== arr[0].idCommnucation )
    return allFiler(  totalArr , finalMess )
}
//() => () => function we want

// const DataTest  = [{
//     idCommnucation : 'A',
//     name : 'hcusahcuas'

// },
// {
//     idCommnucation : 'A',
//     name : 'cashcbhasc'

// },
// {
//     idCommnucation : 'B',
//     name : 'duo23hu234c'

// },
// {
//     idCommnucation : 'B',
//     name : 'd32343223424uc'

// },

// {
//     idCommnucation : 'A',
//     name : 'du03ij2vnkc'

// },
// {
//     idCommnucation : 'A',
//     name : 'ducewhbcjewc'

// },
// {
//     idCommnucation : 'C',
//     name : 'du23h4bj234c'

// },
// {
//     idCommnucation : 'C',
//     name : 'dudbewhdbewc'

// }]