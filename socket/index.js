const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
       const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
       console.log('새로운 클라이언트 접속', ip);
       ws.on('message', (message) => {
           console.log(message.toString());
       });

       ws.on('error', console.error);
       ws.on('close', () => {
           console.log('클라이언트 접속 해제', ip);

           // 연결이 끊어진 경우 인터벌을 멈추어야 한다.
           clearInterval(ws.interval);
       });

       ws.interval = setInterval(() => {
           // 웹소켓 연결을 맺고 바로 전송하는 경우 안되는 경우가 있다.

           if (ws.readyState === ws.OPEN) {
               ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
           }
       }, 3000);

    });
};