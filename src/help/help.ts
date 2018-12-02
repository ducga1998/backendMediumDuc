
// this function auth use 
export function isAuth(resolver) {
    return (obj, args, context, info) => {
        const { user } = context.session
        // console.log('a', context.session.user)
        if (user) {
            return resolver(obj, args, context, info)
        }
        return null

    }
}
//() => () => function we want
