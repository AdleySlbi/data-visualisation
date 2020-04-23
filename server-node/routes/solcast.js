const joi = require('@hapi/joi');
const fetch = require("node-fetch");

let solcastData = [];

exports.solcast = {
    
    method: 'GET',
    path: '/solcasttest',
    handler: async (request, h) => {
        return fetch(process.env.SOLCAST_ROUTE)
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(err => console.log(err));
    }

}