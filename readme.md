## 웹 소켓 구조도

* http 와 webSocket 은 포트를 공유한다.
  * 하지만 프로토콜이 `http` 와 `ws` 로 다르다.
    * `http://` , `ws://`
```
client --HTTP--> PORT 8005 
                      |--> NodeJs --> Express --> 미들웨어& 라우터 -->> client

client <<--WS(양방향)--> PORT 8005 (포트 공유)
                      |--> NodeJs --> 웹 소켓 모듈
```

## MongoDB
### Mongose 사용

## Socket.io 네임스페이스와 방
* io
  * /chat (네임스페이스)
    * /1, /2, /3 (방)

* io
  * /room (네임스페이스)
    * /1, /2, /3 (방)

## API
* socket.on
* socket.of
```javascript
const namespace = socket.of(`/namespace`);
namespace.on('connection', (socket) => {});
```
* io.of('/namespace').adapter
* socket.join
* socket.leave

## 웹 소켓만으로 채팅 구현하기
라우터를 구치지 않고도 채팅을 구현할 수 있습니다. 다음과 같이 하면 됩니다.
```javascript
document.querySelector(('#chat-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.chat.value) {
        socket.emit('chat', {
            room: '{{room._id}}',
            user: '{{user}}',
            chat: e.target.chat.value
        });
        e.target.chat.value = '';
    }
}));
```
웹 소켓을 통해 서버에 chat 이벤트로 채팅에 관한 정보를 보냅니다. {{room._id}} 나 {{user}} 는 넌적스에서 서버데이터를
스크립트에 문자열로 렌더링하는 부분입니다.
```javascript
chat.on('connection', (socket) => {
    //...
    socket.on('disconnection', () => {
    //...
    });
    socket.on('chat', (data) => {
        // data.room 방안에 data 를 뿌린다.
        socket.to(data.room).emit(data);
    });
});
```
웹소켓에서는 chat 이벤트가 발생하면 방에 들어 있는 소켓에 다시 메시지를 전달합니다. chat 이벤트 리스너에
요청을 보내고 있는데, 라우터를 사용하는 대신 웹 소켓 이벤트 리스너 내부에 바로 데이터베이스에 채팅 내용을 저장
하는 코드를 넣어도 되긴 합니다. 하지만 코드 관리가 어려워질 수 있으므로 실제 예제에서는 라우터를 거쳐 저장하는 방식을 택했습니다.

## 기타 Socket.IO API
예제에서는 사용할 일이 없었지만 알아두면 좋은 API 두 개를 소걔
특정인에게 메시를 보내는API 와 나를 제외한 전체에게 메시지를 보내는 API 입니다.

특정인 `to`
```javascript
socket.io(`소켓 아이디`).emit('이벤트', date);
```

나를 제외한 `broadcast`
```javascript
socket.broadcast.emit('이벤트', date); // 네임스페이스
socket.broadcast.to('방 아이디').emit('이벤트', date); // 방
```