'use strict';

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
        let incoming = {"payload":"bad or no payload"}
        if(!JSON.parse(message)){console.warn("bad message !!!!!!!!!!!")}
        else {incoming = JSON.parse(message);}
        switch (incoming.payload) {
            // case 'btnTest':
            //     console.log(`I've been tested with ${message}`)
            //     break;
            // case 'btnClients':
            //     console.log(wss.clients)
            //     wss.clients.forEach(c => c.send("list requested"))
            //     break;
            case 'btnFace':
                wss.clients.forEach(c => c.send(JSON.stringify({
                    "payload": "face"
                })))
                break;
            case 'btnInterface':
                wss.clients.forEach(c => c.send(JSON.stringify({
                    "payload": "interface"
                })))
                break;
            case 'btnLogin':
                wss.clients.forEach(c => c.send(JSON.stringify({
                    "payload": "login",
                    "user": incoming.user,
                    "programme": incoming.programme
                })))
                break;
            default:
                ws.send(JSON.stringify({
                    "payload": 42
                }));
        }
    });
});

HTTP.listen(PORT, () => {
    console.log(`http/ws server listening on ${PORT || process.env.PORT}`);
});