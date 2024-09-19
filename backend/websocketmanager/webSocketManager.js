const { Server } = require('socket.io');

const webSocketManager = (function() {
    let instance;
    let webSocketsMap = new Map();
    function createInstance(httpServer) {
        const io = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
        io.on('connection', (socket) => {
            const { sessionID } = socket.handshake.query;
            console.log("Client connected with sessionID", sessionID);
            webSocketsMap.set(sessionID, socket);

            socket.on('disconnect', () => {
                console.log("Client has been disconnected!");
                webSocketsMap.delete(sessionID);
                console.log("Number of connected clients: ", io.of('/').sockets.size);
            });
        });
        return io;
    }

    return{
        getInstance: function(httpServer) {
            if(!instance) {
                instance = createInstance(httpServer);
            }
            return instance;
        },
        sendMessage: function(sessionID, message) {
            const socket = webSocketsMap.get(sessionID);
            if(socket) {
                socket.emit('message', message);
            }
            else console.log("Socket with given session ID not found!");
        }
    }
})();

module.exports = webSocketManager;