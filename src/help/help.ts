// import { request } from 'supertest';

// this function auth use 
export function isAuth(resolver) {
    return (request, args, context, info) => {
        const { user } = context.session
        // console.log('a', context.session.user)
        if (user) {
            return resolver(request, args, context, info)
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

