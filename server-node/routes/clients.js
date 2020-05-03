const joi = require('@hapi/joi');

const db = require('../config/database')

// Récupère tous les clients sans filtre
exports.mes_clients = {
    method: 'GET',
    path: '/mes-clients',
    handler: (request, h) => {
        // return db.select('*').from('client_info');
        return db.raw("SELECT ci.*, SUM(hd.from_gen_to_consumer) AS gtc , SUM(hd.from_gen_to_grid) as gtg FROM client_info AS ci INNER JOIN history_daily AS hd ON UUID(hd.id) = ci.id GROUP BY ci.id");
    }
} 