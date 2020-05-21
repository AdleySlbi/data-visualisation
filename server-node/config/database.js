module.exports = require('knex')({
    client: 'pg', 
    connection: {
        // host : process.env.DB_HOST, 
        // user : process.env.DB_USER,
        // password: process.env.DB_PASSWORD, 
        // database: process.env.DB_TYPE,
        host: 'equipe-13.cqf0cfj75jd4.eu-west-3.rds.amazonaws.com',
        user : 'student',
        password : 'MapBkAfThy4j2C9vCQBb5sDyRf' ,
        database : 'postgres' ,
    }
})