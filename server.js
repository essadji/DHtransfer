const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 2105 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        switch (message) {
            case 'test':
                console.log(`I've been tested with ${message}`)
                ws.emit(`I've been tested with ${message}`)
                break;
                default:
        }
    });

    ws.send('something');
});