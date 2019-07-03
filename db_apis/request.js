const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    ``;

async function find(context) {
    let query = baseQuery;
    const binds= Object.assign({}, context);
    delete binds.USER;

    if (context.USER == "CUSTOMER") {
        
        query += `select * from REQUESTS where CUSTOMER_ID = :USER_ID`;     
    }
    else {
        query += `select REQUESTS.ASSET_ID , REQUESTS.CUSTOMER_ID, REQUESTS.STATUS
                , REQUESTS.PICKUP_TIME , REQUESTS.DROP_TIME , REQUESTS.RENT from
                   ASSETS INNER JOIN REQUESTS 
                   ON ASSETS.ASSET_ID = REQUESTS.ASSET_ID where ASSETS.LENDER_ID = :USER_ID                          
                             `;   
    }
    console.log(query);
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}

module.exports.find = find;

const createSql =
    `begin 
     insert_in_requests(:ASSET_ID,:CUSTOMER_ID,:PICKUP_TIME,:DROP_TIME);
     end;`;


async function create(adm) {
    const REQUEST = Object.assign({}, adm);

    const binds = REQUEST;

    delete binds.RENT;
    delete binds.STATUS;

    // teacher.fac_code_id = {
    //     dir: oracledb.BIND_OUT,
    //     type: oracledb.STRING
    // }

    const result = await database.simpleExecute(createSql, binds);
    console.log(REQUEST);
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];

     return REQUEST;
}

module.exports.create = create;

const updateSql =
    `begin
     change_status(:ASSET_ID,:CUSTOMER_ID,:PICKUP_TIME,:DROP_TIME);
     end; `;

async function update(adm) {
    
    let updatequery =updateSql;
    const REQUEST = Object.assign({}, adm);

    const binds = REQUEST;

    delete binds.RENT;
    delete binds.STATUS;

    console.log(binds);
    const result = await database.simpleExecute(updatequery,binds);

    return null;
    
}

module.exports.update = update;

const deleteSql =
    `DELETE FROM REQUEST_TABLE `

async function del(fac_code) {
    const binds = {
        fac_code: fac_code,
        rowcount: {
            dir: oracledb.BIND_OUT,
            type: oracledb.NUMBER
        }
    }

    const result = await database.simpleExecute(deleteSql, binds);
    console.log(result);
    return teacher;
}

module.exports.delete = del;