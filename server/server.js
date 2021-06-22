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
        let incoming;
        try {
            incoming = JSON.parse(message)
        } catch (error) {
            console.warn("PAYLOAD ERROR:")
            console.dir(error)
            incoming = { "payload": "illegal payload" }
        }
        switch (incoming.payload) {
            case 'btnClients':
                console.log(wss.clients)
                //wss.clients.forEach(c => c.send("list requested"))
                break;
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
            case 'move':
                wss.clients.forEach(c => c.send(JSON.stringify({
                    "payload": "move",
                    "target": incoming.target,
                    "x": incoming.x,
                    "y": incoming.y
                })))
                break;
            case 'selectBackground':
                wss.clients.forEach(c => c.send(JSON.stringify({
                    "payload": "background",
                    "value": incoming.value
                })))
                break;
            default:
                ws.send(JSON.stringify({
                    "payload": incoming.payload
                }));
        }
    });
});

HTTP.listen(PORT, () => {
    console.log(`about to set up a Node HTTP and WS server on port ${PORT || process.env.PORT} ...`);
    console.log(">>> \x1b[32mserver up and running\x1b[0m\n");
    console.log(`\x1b[45m  =================  \x1b[0m\n`);
    console.log(`system messages ...`);
});