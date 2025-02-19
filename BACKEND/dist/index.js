"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allUsers = [];
wss.on("connection", function (socket) {
    socket.on("message", (ev) => {
        const user = JSON.parse(ev.toString());
        console.log(user);
        if (user.type == "join") {
            allUsers.push({
                socket: socket,
                roomId: user.roomId,
                name: user.name,
            });
        }
        if (user.type == "chat") {
            allUsers.forEach((x) => {
                if (x.roomId == user.roomId) {
                    x.socket.send(JSON.stringify({
                        message: user.message,
                        name: user.name,
                    }));
                }
            });
        }
    });
});
// if(user.type == "chat"){
//     allUsers.forEach((x: any) => {
//         if(x.roomId == user.roomId){
//             x.socket.send(user.message);
//         }
//     });
// }
