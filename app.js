// const express = require('express');

// const app = express();

// const productRouters = require('./api/routes/products');

// app.use('', (req, res, next) => { // creates a middle ware
//     res.status(200).json({
//         message: 'It works!!'
//     });
// });
// var server = app.listen(3000, '127.0.0.1', function(req, res) {

//     var host = server.address().address
//     var port = server.address().port

//     console.log(`Server running at http://${host}:${port}/`);
// })

// app.use('/products', productRouters);

// module.exports = app;

const express = require('express');
const app = express();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;