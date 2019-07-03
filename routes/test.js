// const oracledb = require("oracledb");
// const uniqueString = require("unique-string")
// const express = require('express');
// const app = express();
// const bodyParser = require("body-parser")

// //setup body-parser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// oracledb.autoCommit = true;


// async function run() {
//     var mypw = "oracle";
//     connection = await oracledb.getConnection({
//         user: "system",
//         password: mypw,
//         connectString: "localhost/orcl"
//     });
// }

// app.get('/test', bodyParser, function(req, res) {
//     connection.execute(
//         `UPDATE tab_teacher SET dept = :dept
//              WHERE fac_code = :code
//              RETURNING last_name, dept INTO :lvar, :dvar`, {
//             code: "SY",
//             dept: "ECE",
//             lvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
//             dvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
//         },
//         function(err, result) {
//             if (err) { console.error(err); return; }
//             console.log(result.outBinds);
//         });
// })
const oracledb = require("oracledb");
const uniqueString = require("unique-string")
const express = require('express');
const app = express();
const bodyParser = require("body-parser")

//setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

oracledb.autoCommit = true;

let connection;
// app.use(express.static('public'));

async function run() {

    connection = await oracledb.getConnection({
            user: "system",
            password: "oracle",
            connectString: "localhost/orcl"
        },
        //   function(err, connection)
        //   {
        //     if (err) { console.error(err); return; }
        //     else{
        //       console.log("connection");

        //     }}
    );
}

app.get('', function(req, res) {
    res.end('IH');
})

app.get('/test', bodyParser, function(req, res) {
    connection.execute(
        `UPDATE tab_teacher SET dept = :dept
             WHERE fac_code = :code
             RETURNING last_name, dept INTO :lvar, :dvar`, {
            code: "SY",
            dept: "ECE",
            lvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
            dvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
        },
        function(err, result) {
            if (err) { console.error(err); return; }
            console.log(result.outBinds);
        });
})

app.post("/login", function(req, res) {
    mUsername = req.body.id;
    mPassword = req.body.password;
    userToken = uniqueString();

    query = "BEGIN create_user(:id,:password);  END;"

    connection.execute(query, {
        id: mUsername,
        password: mPassword,
        lvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        dvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
    }, {
        id: mUsername,
        password: mPassword,
        lvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        dvar: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
    }, function(err, result) {
        if (err) { console.error(err); return; }
        console.log(result.outBinds);
    });
})

run();

app.listen(3000, function() {
    console.log('Server Started...');
})