// // file busniess logic 
// import { followModel, followType } from '../models/follow';

// export async function hasExistFollow(input: followType) {
//     let flag
//     await followModel.find(input, (err, data) => {
//         if (err) {
//             flag = false
//             return
//         }
//         if (!data) {
//             flag = false
//             return
//         }
//         flag = true
//         return
//     })
//     console.log('caschasbchjasc', flag)
//     return flag
// }