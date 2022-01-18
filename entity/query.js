const connection = require('../config/connection')


const queryData = async (qry) => {
    return new Promise((resolve,reject)=>{
        connection.connect();
        connection.query(qry, function (error, results, fields) {
            if (error) {
                reject(error);
            }else{
                resolve(results)
            }
        });
        connection.end();
    })
}

module.exports = queryData

