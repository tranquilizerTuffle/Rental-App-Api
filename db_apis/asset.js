const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
    `select * from ASSETS `;

async function find(context) {
    let query = baseQuery;
    const binds = {};
     if(context.ASSET_ID){
        binds.ASSET_ID = context.ASSET_ID;  
        query += `\nwhere ASSET_ID = :ASSET_ID `;     
     }
     else if (context.IS_AVAIL == `YES`) {
         binds.IS_AVAIL = context.IS_AVAIL;
        
         query += `\nwhere IS_AVAIL = :IS_AVAIL `;     
     }
     if(context.LENDER_ID){
        binds.LENDER_ID = context.LENDER_ID;  
        query += `\nwhere LENDER_ID = :LENDER_ID`; 
     }
    
    console.log(query);
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.find = find;

const createSql =
    `INSERT INTO ASSETS ( ASSET_ID , ASSET_TYPE , ASSET_NAME  , LENDER_ID , PICKUP_LOCATION , DROP_LOCATION ,
          CHARGES , IS_AVAIL )    VALUES ( :ASSET_ID , :ASSET_TYPE , :ASSET_NAME , :LENDER_ID ,
            :PICKUP_LOCATION , :DROP_LOCATION ,  :CHARGES , :IS_AVAIL ) ` ;

async function create(ast) {
    const asset = Object.assign({}, ast);

    // teacher.fac_code_id = {
    //     dir: oracledb.BIND_OUT,
    //     type: oracledb.STRING
    // }
    console.log(createSql);
    const result = await database.simpleExecute(createSql, asset);
    
    //teacher.fac_code_id = result.outBinds.fac_code_id[0];

    return asset;
}

module.exports.create = create;

const updateSql =
    `update ASSETS set ASSET_NAME= :ASSET_NAME,
    ASSET_TYPE = :ASSET_TYPE,
     PICKUP_LOCATION = :PICKUP_LOCATION,
     DROP_LOCATION = :DROP_LOCATION ,
    CHARGES = :CHARGES , IS_AVAIL = :IS_AVAIL where ASSET_ID = :ASSET_ID`;

async function update(adm) {

    
    // if(adm.ASSET_PICKUP){
    //     delete adm.ASSET_PICKUP;
 
    //     updatequery += `  CUSTOMER_ID= :CUSTOMER_ID,
    //     PICKUP_TIME= :PICKUP_TIME , DROP_TIME= :DROP_TIME ,IS_AVAIL = 'NO'
    //      where ASSET_ID = :ASSET_ID`;
    //  }
    
    //  if(adm.ASSET_DROP){
    //     delete adm.ASSET_DROP;
 
    //     updatequery += `  DROP_LOCATION= :DROP_LOCATION,,
    //     DROP_TIME= CURRENT_TIMESTAMP  where ASSET_ID = :ASSET_ID`;
    //  }

    const admin = Object.assign({}, adm); 
    console.log(admin);

    console.log(updateSql);
    const result = await database.simpleExecute(updateSql,admin);
    if (result.rowsAffected && result.rowsAffected === 1) {
        return admin;
    } else {
        return null;
    }
}

module.exports.update = update;

const deleteSql =
`begin
delete_asset(:ASSET_ID);
end; `;

async function del(fac) {
   
    const binds = Object.assign({}, fac); 

    const result = await database.simpleExecute(deleteSql, binds);
    console.log(result);
    return result ;
}

module.exports.delete = del;