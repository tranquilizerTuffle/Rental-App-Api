const admin = require('../db_apis/admin.js');

async function get(req, res, next) {
    try {
        const context = {};
        // console.log(req);
        console.log(typeof(req));
        //context.id = parseInt(req.params.id, 10);
        context.ADMIN_ID = req.query.ADMIN_ID;
        context.ADMIN_PASSWORD = req.query.ADMIN_PASSWORD;
        console.log(req);
        const rows = await admin.find(context);
        
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

function getADMINFromRec(req) {
    const teacher = {
        ADMIN_ID: req.query.ADMIN_ID,
        ADMIN_NAME: req.query.ADMIN_NAME,
        ADMIN_PASSWORD: req.query.ADMIN_PASSWORD,
    };

    return teacher;
}

async function post(req, res, next) {
    try {
        let admin = getADMINFromRec(req);

        admin = await admin.create(admin);

        res.status(201).json(admin);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

async function put(req, res, next) {
    try {
        let teacher = getADMINFromRec(req);

        //employee.employee_id = parseInt(req.params.id, 10);

        teacher = await admin.update(teacher);
        console.log(teacher);
        if (teacher !== null) {
            res.status(200).json(teacher);
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
        const success = await admin.delete(fac_code);

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