const joi = require('@hapi/joi');

const db = require('../config/database')

// Récupère tous les clients sans filtre
exports.mes_clients= {
    method: 'GET',
    path : '/mes-clients',
    handler: (req, toolkit) => {
        // SELECT ci.*, SUM(hd.from_gen_to_consumer) AS gtc , SUM(hd.from_gen_to_grid) as gtg FROM client_info AS ci INNER JOIN history_daily AS hd ON UUID(hd.id) = ci.id GROUP BY ci.id
        return db.select('client_info.*', db.raw('SUM(history_daily.from_gen_to_consumer) AS gtc , SUM(history_daily.from_gen_to_grid) as gtg ')).from('client_info').innerJoin('history_daily', 'client_info.id', 'history_daily.id').groupBy('client_info.id').then(result => {
            return toolkit.response({
                statusCode: 200,
                message: 'Ok',
                errors: null,
                data: {
                    data: result
                }
            }).code(200);
        
        })
        .catch(err => {
            console.log(err)
            return toolkit.response({
                statusCode: 500,
                message: 'Bad request',
                errors: [
                    { message: "Failed to connect to database" }
                ],
                data: null
            }).code(500);
        });


    }
}

// Petit tweak pour simuler l'effet d'un filtre
exports.mes_clients_filters = {
    method: 'GET',
    path: '/mes-clients-filter',
    handler: (req, toolkit) => {
        // return db.select('*').from('client_info');
        // SELECT ci.*, SUM(hd.from_gen_to_consumer) AS gtc , SUM(hd.from_gen_to_grid) as gtg FROM client_info AS ci INNER JOIN history_daily AS hd ON UUID(hd.id) = ci.id WHERE ci.status_bilan = 1 GROUP BY ci.id
        return db.select('client_info.*', db.raw('SUM(history_daily.from_gen_to_consumer) AS gtc , SUM(history_daily.from_gen_to_grid) as gtg ')).from('client_info').innerJoin('history_daily', 'client_info.id', 'history_daily.id').where('client_info.status_bilan', '=', '1').groupBy('client_info.id').then(result => {
            return toolkit.response({
                statusCode: 200,
                message: 'Ok',
                errors: null,
                data: {
                    data: result
                }
            }).code(200);
        
        })
        .catch(err => {
            console.log(err)
            return toolkit.response({
                statusCode: 500,
                message: 'Bad request',
                errors: [
                    { message: "Failed to connect to database" }
                ],
                data: null
            }).code(500);
        });
    }
} 


