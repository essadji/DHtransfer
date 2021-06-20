const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 2105 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
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
        }
    });

    ws.send('something');
});