const user = require('../db_apis/user.js');

async function get(req, res, next) {
    try {
        const context = {};
        // console.log(req);
        console.log(typeof(req));
        //context.id = parseInt(req.params.id, 10);
        context.USER_ID = req.query.USER_ID;
        context.USER_PASSWORD = req.query.USER_PASSWORD;
        console.log(req.queryUSER_ID);
        const rows = await user.find(context);
        
        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;

function getUSERFromRec(req) {
    const user = {
        USER_ID: req.query.USER_ID,
        USER_NAME: req.query.USER_NAME,
        USER_PASSWORD: req.query.USER_PASSWORD,
        USER_LOCATION: req.query.USER_LOCATION,
        USER_CONTACT: req.query.USER_CONTACT
    };

    return user;
}

async function post(req, res, next) {
    try {
        let USER = getUSERFromRec(req);

        USER = await user.create(USER);

        res.status(201).json(USER);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

async function put(req, res, next) {
    try {
        let USER = getUSERFromRec(req);

        //employee.employee_id = parseInt(req.params.id, 10);

        USER = await user.update(USER);
        console.log(user);
        if (USER !== null) {
            res.status(200).json(USER);
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