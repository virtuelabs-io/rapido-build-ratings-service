'use strict';

const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOST,
        user: process.env.USERNAME,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
})

module.exports.fun = async (event, context, callback) => {
    global.fetch = require('node-fetch');
    console.log(event)
    let customer_id = event.cognitoPoolClaims.sub
    let product_id = Number(event.path.id)
    let query = `
        SELECT AVG(rating)
            FROM ratings.feedback
            WHERE product_id = ?
            AND active = TRUE;
    `;
    console.log("Running query", query);
    let results = await mysql.query(query, [
        product_id
    ])
    await mysql.end()
    return results
}
