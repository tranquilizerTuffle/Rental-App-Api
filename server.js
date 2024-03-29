// const http = require('http');
// const express = require('express');
// const app = require('./app').default;

// const port = process.env.PORT || 3000;

// const server = http.createServer(function(req, res) {

//     var host = server.address().address
//     var port = server.address().port

//     res.end(`Server running at http://${host}:${port}/`);
// });

// server.listen(port, 'localhost');
// console.log('node');

// const app1 = express();

// const productRouters = require('./api/routes/products');

// app1.use('', (req, res, next) => { // creates a middle ware
//     res.status(200).json({
//         message: 'It works!!'
//     });
// });
// const http = require('http');
// const app = require('./app');

// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);

const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;

// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function startup() {
    console.log('Starting application');

    try {
        console.log('Initializing database module');

        await database.initialize();
    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }

    try {
        console.log('Initializing web server module');

        await webServer.initialize();
    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }
}

startup();

async function shutdown(e) {
    let err = e;

    console.log('Shutting down application');

    try {
        console.log('Closing web server module');

        await webServer.close();
    } catch (e) {
        console.error(e);

        err = err || e;
    }

    try {
        console.log('Closing database module');

        await database.close();
    } catch (e) {
        console.error(e);

        err = err || e;
    }

    console.log('Exiting process');

    if (err) {
        process.exit(1); // Non-zero failure code
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');

    shutdown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');

    shutdown();
});

process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);

    shutdown(err);
});