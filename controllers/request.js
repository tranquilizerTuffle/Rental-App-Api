const request = require('../db_apis/request.js');


async function get(req, res, next) {
    try {
        const context = {};
        
        context.USER = req.query.USER;
        context.USER_ID = req.query.USER_ID;
        // console.log(req);
        console.log(typeof(req));
        //context.id = parseInt(req.params.id, 10);
    
        const rows = await request.find(context);
        
      
        if (rows.length === 0) {
                res.status(404).end();
         }
        else 
        {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;


function getRequestfromreq(req) {
    const request = {
        ASSET_ID: req.query.ASSET_ID,
        CUSTOMER_ID: req.query.CUSTOMER_ID,
        STATUS: req.query.STATUS,
        PICKUP_TIME: req.query.PICKUP_TIME,
        DROP_TIME: req.query.DROP_TIME,
        RENT: req.query.RENT,
    };

    return request;
}


async function post(req, res, next) {
    try {
        let REQUEST = getRequestfromreq(req);

        REQUEST = await request.create(REQUEST);

        res.status(201).json(REQUEST);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

async function put(req, res, next) {
    try {
        let REQUEST = getRequestfromreq(req);

        //employee.employee_id = parseInt(req.params.id, 10);

        REQUEST = await request.update(REQUEST);
        console.log(REQUEST);
        if (REQUEST !== null) {
            res.status(200).json(REQUEST);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.put = put;

async function del(req, res, next) {
    try {
        //const id = parseInt(req.params.id, 10);
        const fac_code = req.query.fac_code;
        console.log(fac_code);
        const success = await users.delete(fac_code);

        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.delete = del;