import io from 'socket.io'

const socketAuth = function socketAuth(socket, next) {
    // console.log(socket)
    return next();
    return next(new Error('Nothing Defined'));
};

const socketConnection = (socket) => {
    socket.emit('message', { message: 'Hey!' });
    socket.on('chat', (data) => {
        console.log(data)
    })
};

export const startIo = function startIo(server) {
    const io2 = io.listen(server);
    const packtchat = io2.of('/packtchat');

    packtchat.use(socketAuth);
    packtchat.on('connection', socketConnection);

    return io;
};