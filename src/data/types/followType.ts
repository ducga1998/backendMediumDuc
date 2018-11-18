const follow = /* GraphQL */`
    type Follow  {
        idUser: String
        idUserFollow: String
        userFollow : User
    }
    input FollowInput {
        idUser: String
        idUserFollow: String
    }
    extend type Mutation {
        follow(input :FollowInput):Follow
        unFollow(input :FollowInput):Follow
    }
    extend type Query {
        getAllInfomationUserFollowYour(idUser:String) : Follow
    }
`
export default follow