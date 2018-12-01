// import { session } from 'express-session';
// import { isAuth } from 'help/help';
// import jwt from 'express-jwt'
// const secret = "nguyen minh duc"
// function generateGUID() {
//     return new Date().getTime()
// }
// export function generateToken(req, GUID, opts) {
//     opts = opts || {};
//     var expiresDefault = '7d'
//     var token = jwt.sign({
//         auth: GUID,
//         agent: req.headers['user-agent'],
//     }, secret, { expiresIn: opts.expires || expiresDefault })
//     return token;
// }
// export function generateAndStoreToken(req, opts = {}) {
//     var GUID = generateGUID()
//     var token = generateToken(req, GUID, opts);
//     // a here will add data in database
//     return token
// }
// export function authSucess(req, res) {
//     var token = generateAndStoreToken(req)
//     res.writeHead(200, {
//         'content-type': 'text/html',
//         'authorization': token
//     })
//     return "csaca"
// }
// function authHandler(req, res) {
//     if (req.method === 'POST') {
//         var body = '';
//         req.on('data', function (data) {
//             body += data;
//         }).on('end', function () {
//             var post = qs.parse(body);
//             if (post.username && post.username === u.un && post.password && post.password === u.pw) {
//                 return authSuccess(req, res);
//             } else {
//                 return authFail(res);
//             }
//         });
//     } else {
//         return authFail(res);
//     }
// }
// function privado(res, token) {
//     res.writeHead(200, {
//         'content-type': 'text/html',
//         'authorization': token
//     });
//     return res.end(restricted);
// }

// function verify(token) {
//     var decoded = false;
//     try {
//         decoded = jwt.verify(token, secret);
//     } catch (e) {
//         decoded = false; // still false
//     }
//     return decoded;
// }


// //
export function isAuth(resolver) {
    return (obj, args, context, info) => {
        console.log('a', context.session)
        return resolver(obj, args, context, info)
    }
}
