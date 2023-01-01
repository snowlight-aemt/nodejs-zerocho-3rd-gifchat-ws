const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, { path: '/socket.io'});

    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        // socket.id 연결에 아이디
        console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);
        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해제', ip, socket.id);

            // 연결이 끊어진 경우 인터벌을 멈추어야 한다.
            clearInterval(socket.interval);
        });
        socket.on('reply', (data) => {
            console.log(data);
        })

        socket.on('error', console.error);
        socket.interval = setInterval(() => {
            // 웹소켓 연결을 맺고 바로 전송하는 경우 안되는 경우가 있다.
            socket.emit('news', 'Hello Socket.IO');
        }, 3000);

    });
};