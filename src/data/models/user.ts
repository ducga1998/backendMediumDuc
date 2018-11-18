import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    idUser: String,
    login: String,
    avatarLink: String,
    name: String,
    password: String,
    decentraliz: Number, // admin 3 , monitor : 2 , user : 1
    // articles: [String], // all article user has been writed
    bookMark: [String], // all article bookmark
    totalFollow: [String], // total other people follow
    followOtherPeople: [String], // use to view follow ?
    // articles2 : mongoose.Schema.Types.Mixed,
})




//  when we need add user then we only need these information : ))
export interface UserType {
    idUser: String,
    login: String,
    avatarLink?: String,
    name?: String,
    password: String,
    decentraliz: Number, // admin 3 , monitor : 2 , user : 1 // default when user reg is 1
}
// this solve 
UserSchema.virtual('articles', {
    foreignField: 'idUser',
    localField: 'idUser',
    ref: 'Article',
    justOne: false
})
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
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
export function checklogin(login, password) {
    console.log(login)
    return new Promise(resolve => {
       const dataUser =  userModel.findOne({ login, password }).populate('articles')
        dataUser.exec((err, data) => {
            if (err) {
                console.log(err)
            }
            console.log('get all data article ', data)
            resolve(data)
        })
    })
}
export function getAllArticle(idUser: String) {
    console.log('id ', idUser)
    return new Promise(resolve => {
        const dataUser = userModel.findOne({ idUser }).populate('articles')
        dataUser.exec((err, data) => {
            if (err) {
                console.log(err)
            }
            console.log('get all data article ', data)
            resolve(data)
        })
        // console.log('dataUser' ,dataUser)
    })
}
export async function addNewUser(user: UserType) {

    const { login } = user;
    // console.log('ahih', data)
    let users;
    await userModel.find({ login }, function (err, data) {
        if (err) {
            return err
        }
        users = data
        // console.log(data)

    })
    if (users && users.length > 0) {
        console.log('trung id roi em ei')
        return new Promise(resolve => {
            resolve({
                idUser: null,

            })
        })
    }
    else if (users && users.length === 0) {
        console.log('runnnn')
        const newUser = new userModel(user);
        return new Promise(async resolve => {
            await newUser.save(function (err, data) {
                if (err) {
                    resolve(err)
                }

                resolve(data)

            })
        })
    }
}
export function updateInfomationUser(user: UserType) {
    const { idUser } = user;

    return new Promise(resolve => {
        userModel.updateOne({ idUser }, user, (err: any, data: any) => {
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
