const userType = /* GraphQL */`
    type User {
        idUser: String
        login: String
        password: String
        decentraliz: Int 
        name: String
        avatarLink: String
        articles: [String]
        bookMark: [String]
        totalFollow: [String]
        followOtherPeople: [String]
    }
    input UserInput {
        idUser: String
        login: String
        password: String
        decentraliz: Int
        name: String
        avatarLink: String
    }
    extend type Query {
        getAllInformationUser(id: String):User
        checklogin(username:String,password:String) : User 
    }
    extend type Mutation {
        deleteUserById(id:String): User
        updateInfomationUser(input: UserInput): User
        addNewUser(input: UserInput):User
    }
`
export default userType