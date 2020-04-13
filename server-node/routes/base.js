const joi = require('@hapi/joi');

const db = require('../config/database')

exports.test = {
    method: 'GET',
    path: '/api',
    handler: (request, h) => {
        return db.select('city').distinct('city').from('history_daily');
    }
} 

// knex.select(knex.raw('distinct on ("column1") "column2"').from('tbl_name')
