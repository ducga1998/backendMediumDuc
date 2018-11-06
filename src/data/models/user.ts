import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    idUser: String,
    login: String,
    password: String,
    decentraliz: Number, // admin 3 , monitor : 2 , user : 1
    articles: [String], // all article user has been writed
    bookMark: [String], // all article bookmark
    totalFollow: [String], // total other people follow
    followOtherPeople: [String] // use to view follow ? 
})
//  when we need add user then we only need these information : ))
export interface UserType {
    idUser: String,
    login: String,
    password: String,
    decentraliz: Number, // admin 3 , monitor : 2 , user : 1 // default when user reg is 1
}
const userModel = mongoose.model("users", UserSchema);
// View all aricle , when user want display all article has been write 
// in model user then we only queries return data relation user OK 
export function getAllInformationUser(idUser: string) {
    return new Promise(resolve => {
        userModel.find({ idUser }, function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function addNewUser(user: UserType) {
    const newUser = new userModel(user);
    return new Promise(resolve => {
        newUser.save(function (err, data) {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function updateInfomationUser(user: UserType) {
    const { idUser } = user
    return new Promise(resolve => {
        userModel.updateOne({ idUser }, (err: any, data: any) => {
            if (err) {
                resolve(err)
            }
            resolve(data)
        })
    })
}
export function deleteUserById(idUser: string) {
    return new Promise(resolve => {
        userModel.deleteOne({ idUser }, function (err) {
            if (err) {
                resolve(err)
            }
        })
    })
}