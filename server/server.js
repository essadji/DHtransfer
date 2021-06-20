'use strict';

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 2105 });
const WSS = require('ws').Server;  // WSSserver
const HTTP = require('http').createServer(); // server
const APP = require('./app');
const PORT = 2105;

// Create web socket server on top of a regular http server
let wss = new WSS({
    server: HTTP
});

// Also mount the app here
HTTP.on('request', APP);

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log(`received: ${message}`);
        switch (message) {
            // case 'btnTest':
            //     console.log(`I've been tested with ${message}`)
            //     break;
            // case 'btnClients':
            //     console.log(wss.clients)
            //     wss.clients.forEach(c => c.send("list requested"))
            //     break;
            case 'btnFace':
                wss.clients.forEach(c => c.send("face"))
                break;
            case 'btnInterface':
                wss.clients.forEach(c => c.send("interface"))
                break;
            case 'btnLogin':
                wss.clients.forEach(c => c.send("login"))
                break;
            default:
                ws.send(JSON.stringify({              
                    answer: 42
                }));
        }
    });
});

HTTP.listen(PORT, () => {
    console.log(`http/ws server listening on ${PORT||process.env.PORT}`);
});