const joi = require('@hapi/joi');

const db = require('../config/database')

// Récupère tous les clients sans filtre
exports.mes_clients = {
    method: 'GET',
    path: '/mes-clients',
    handler: (request, h) => {
        return db.select('*').from('client_info');
    }
} 