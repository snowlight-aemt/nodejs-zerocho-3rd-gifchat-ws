const Room = require("../schemas/room");
const Chat = require("../schemas/chat");

exports.removeRoom = async (roomId) => {
    try {
        await Room.remove({_id: roomId});
        await Chat.remove({room: roomId});
    } catch (error) {
        // TODO throw 컨트롤러로 넘긴다.
        throw error;
    }
}