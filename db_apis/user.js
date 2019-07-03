const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `select * from USER_DETAILS`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.USER_PASSWORD) {
        binds.USER_ID = context.USER_ID;
        binds.USER_PASSWORD = context.USER_PASSWORD;
        query += `\nwhere USER_ID = :USER_ID AND USER_PASSWORD = :USER_PASSWORD`;     
    }
    else if(context.USER_ID){
        binds.USER_ID = context.USER_ID;
        query += `\nwhere USER_ID = :USER_ID `;   

    }
    
    
    console.log(query);
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}

module.exports.find = find;

const createSql =
    `INSERT INTO USER_DETAILS VALUES( :USER_NAME, :USER_PASSWORD, :USER_ID, :USER_LOCATION,
         :USER_CONTACT)`;


async function create(adm) {
    const USER = Object.assign({}, adm);

    // teacher.fac_code_id = {
    //     dir: oracledb.BIND_OUT,
    //     type: oracledb.STRING
    // }

    const result = await database.simpleExecute(createSql, USER);
    console.log(USER);
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];

    if (result.rowsAffected && result.rowsAffected === 1) {
        return USER;
    } else {
        return null;
    }
}

module.exports.create = create;

const updateSql =
    `update USER_DETAILS set `;

async function update(adm) {
    
    let updatequery =updateSql;
    const USER = Object.assign({}, adm);
    console.log(USER);
    if(USER.USER_PASSWORD){
        updatequery += ` USER_PASSWORD = :USER_PASSWORD`;
    }
    else delete USER.USER_PASSWORD;
    if(USER.USER_LOCATION){
        updatequery += `, USER_LOCATION = :USER_LOCATION`;
    }
    else delete USER.USER_PASSWORD;
    if(USER.USER_CONTACT){
        updatequery += `, USER_CONTACT= :USER_CONTACT`;
    }
    else delete USER.USER_PASSWORD;
    if(USER.USER_NAME){
        updatequery += `, USER_NAME = :USER_NAME`
    }else delete USER.USER_NAME;
    updatequery += ` where USER_ID = :USER_ID`; 
    console.log(updatequery);
    const result = await database.simpleExecute(updatequery,USER);
    if (result.rowsAffected && result.rowsAffected === 1) {
        return USER;
    } else {
        return null;
    }
}

module.exports.update = update;

const deleteSql =
    `DELETE FROM USER_TABLE `

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