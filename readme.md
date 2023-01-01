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