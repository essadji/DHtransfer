const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 2105 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        switch (message) {
            case 'test':
                console.log(`I've been tested with ${message}`)
                // wss.emit(`I've been tested with ${message}`)
                break;
                case 'clients':
                    console.log(wss.clients)
                    wss.clients.forEach(c=>c.send("list requested"))
                    break;
                default:
        }
    });

    ws.send('something');
});