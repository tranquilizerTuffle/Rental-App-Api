const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `select ADMIN_NAME, ADMIN_ID , ADMIN_PASSWORD from ADMINS`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.ADMIN_PASSWORD) {
        binds.ADMIN_ID = context.ADMIN_ID;
        binds.ADMIN_PASSWORD = context.ADMIN_PASSWORD;
        query += `\nwhere ADMIN_ID = :ADMIN_ID AND ADMIN_PASSWORD = :ADMIN_PASSWORD`;     
    }
    console.log(query);
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}

module.exports.find = find;

const createSql =
    `INSERT INTO ADMINS VALUES( :ADMIN_NAME, :ADMIN_PASSWORD, :ADMIN_ID)`;

async function create(adm) {
    const admin = Object.assign({}, adm);

    // teacher.fac_code_id = {
    //     dir: oracledb.BIND_OUT,
    //     type: oracledb.STRING
    // }
    const result = await database.simpleExecute(createSql, admin);
    console.log(admin);
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];

    return admin.rows;
}

module.exports.create = create;

const updateSql =
    `update ADMINS set `;

async function update(adm) {
    
    let updatequery =updateSql;
    const admin = Object.assign({}, adm);
    console.log(admin);
    if(admin.ADMIN_PASSWORD){
        updatequery += ` ADMIN_PASSWORD = :ADMIN_PASSWORD`;
    }
    else delete admin.ADMIN_PASSWORD;
    if(admin.ADMIN_NAME){
        updatequery += `, ADMIN_NAME = :ADMIN_NAME`
    }else delete admin.ADMIN_NAME;
    updatequery += ` where ADMIN_ID = :ADMIN_ID`; 
    console.log(updatequery);
   
    return adm;
   
}

module.exports.update = update;

const deleteSql =
    `begin
    del_teacher(:fac_code);
    :rowcount := sql%rowcount;
  end;`

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