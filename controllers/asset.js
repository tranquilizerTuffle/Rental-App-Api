const asset = require('../db_apis/asset.js');

async function get(req, res, next) {
    try {
        const context = {};
        // console.log(req);
        console.log(typeof(req));
        //context.id = parseInt(req.params.id, 10);
        context.IS_AVAIL = req.query.IS_AVAIL;
        context.ASSET_ID = req.query.ASSET_ID;
        context.LENDER_ID= req.query.LENDER_ID;
        
        const rows = await asset.find(context);
        
      
       res.status(200).json(rows);
        
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;

function getAssetFromRec(req) {
    const teacher = {
        ASSET_ID: req.query.ASSET_ID,
        ASSET_NAME: req.query.ASSET_NAME,
        ASSET_TYPE: req.query.ASSET_TYPE,
        LENDER_ID : req.query.LENDER_ID,
        PICKUP_LOCATION: req.query.PICKUP_LOCATION,
        DROP_LOCATION: req.query.DROP_LOCATION,
        CHARGES : req.query.CHARGES,
        IS_AVAIL: req.query.IS_AVAIL
    };

    return teacher;
}

async function post(req, res, next) {
    try {
        let ASSET = getAssetFromRec(req);
        console.log(ASSET);

        ASSET = await asset.create(ASSET);

        res.status(201).json(ASSET);
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;


function getAssetFromRecForPut (req) {
    const teacher = {
        ASSET_ID: req.query.ASSET_ID,
        ASSET_NAME: req.query.ASSET_NAME,
        ASSET_TYPE: req.query.ASSET_TYPE,
        //USER_ID: req.query.USER_ID,
        PICKUP_LOCATION: req.query.PICKUP_LOCATION,
        //PICKUP_TIME: req.query.PICKUP_TIME,

      
        DROP_LOCATION: req.query.DROP_LOCATION,
        //DROP_TIME: req.query.DROP_TIME,
        CHARGES : req.query.CHARGES,
        IS_AVAIL: req.query.IS_AVAIL,
        //CUSTOMER_ID: req.query.CUSTOMER_ID,

        //ASSET_UPDATE: req.query.ASSET_UPDATE,
        //ASSET_PICKUP: req.query.ASSET_PICKUP,
        //ASSET_DROP: req.query.ASSET_DROP
    };

    return teacher;
}

async function put(req, res, next) {
    try {
        let teacher = getAssetFromRecForPut(req);

        //employee.employee_id = parseInt(req.params.id, 10); 
        teacher = await asset.update(teacher);
    

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
        const asset_id ={ ASSET_ID : req.query.ASSET_ID};
        const success = await asset.delete(asset_id);
        console.log(success);

        if (success) {
            res.status(204).json(asset_id);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.delete = del;