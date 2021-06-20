'use strict';

// let fs = require('fs');
const X = require('express');
const APP = X();
// let bodyParser = require('body-parser');

// APP.use(bodyParser.json());

APP.use('/james', X.static(__dirname + '/JAMES'));
APP.use('/ui', X.static(__dirname + '/UI'));

// Let's create the regular HTTP request and response
APP.get('/', (req, res) => {
    console.log('Get index');
    let t = Date();
    res.send(
            `${t} ::: checking for signs of life from version ${req.app.locals.meta}`
        );
    
    // fs.createReadStream('./index.html').pipe(res);
});

APP.post('/', (req, res) => {
    // let message = req.body.message;
    // console.log('Regular POST message: ', message);
    return res.json({
        answer: 42
    });
});

module.exports = APP;