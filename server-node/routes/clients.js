const joi = require('@hapi/joi');

const db = require('../config/database')

/**
 * Requête GET qui récupère tous les clients sans filtres
 * SELECT ci.*, SUM(hd.from_gen_to_consumer) AS gtc , SUM(hd.from_gen_to_grid) as gtg FROM client_info AS ci INNER JOIN history_daily AS hd ON UUID(hd.id) = ci.id GROUP BY ci.id
 */
exports.mes_clients= {
    method: 'GET',
    path : '/mes-clients',
    handler: (req, toolkit) => {
    
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

/**
 * Méthode : 
 *  Faire passer le filtre
 *  Réaliser une requête qui prends en compte le filtre qui est passé. 
 *  Va réaliser une requêtes pour retourner des clients filtré. 
 *  La requête SQL présenté
 *  SELECT ci.*, SUM(hd.from_gen_to_consumer) AS gtc , SUM(hd.from_gen_to_grid) as gtg FROM client_info AS ci INNER JOIN history_daily AS hd ON UUID(hd.id) = ci.id WHERE ci.status_bilan = 1 GROUP BY ci.id
 */
exports.mes_clients_filters = {
    method: 'GET',
    path: '/mes-clients-filter',
    handler: (req, toolkit) => {
        // return db.select('*').from('client_info');

        return db.select('client_info.*', db.raw('SUM(history_daily.from_gen_to_consumer) AS gtc , SUM(history_daily.from_gen_to_grid) as gtg ')).from('client_info').innerJoin('history_daily', 'client_info.id', 'history_daily.id').where('client_info.status_bilan', '=', '2').groupBy('client_info.id').then(result => {
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

/**
 * Post Request qui permet de créer une nouvelle liste de diffusion client.
 * Méthode : 
 *  Récupérer les id des clients affichés dans la dialog box
 *  Créer une nouvelle table qui prends le nom du filtre 
 *  Ajouter dans cette table les id des clients concernés par ce filtre
 *  Ajouter le nom de cette table dans la liste des tables de filtre
 *  Requête SQL utilisé par rapport à la fonction ci-dessus : 
 * 
 *  CREATE TABLE list_client_demo(
 * 	id	serial,
 *	id_clients TEXT NULL
 *  );
 *  INSERT INTO list_client_demo(id_clients) SELECT id FROM client_info WHERE client_info.status_bilan = '2';
 * 
 */
exports.new_list = {
    method: 'POST',
    path: '/mes-clients/dialog/new-list',
    options: {
        validate: {
            payload: joi.object().keys({
                id_liste: joi.string(),
                id_client: joi.array().items(joi.string()), 
                id_conseiller: joi.string()
            })
        }
    },
    handler: async (req, toolkit) => {
        return db.insert({
            id_liste: req.payload.id_liste,
            id_client: req.payload.id_client,
            id_conseiller: req.payload.id_conseiller
        })
        .into('liste_client')
        .returning('id_liste','id_client','id_conseiller')
        .then(result => {
            return toolkit.response({
                statusCode: 201,
                errors: null,
                message: 'Created',
                meta: {
                    query: req.query,
                    params: req.params
                },
                data: result
            }).code(201);
        })
        .catch(err => {
            console.log(err)
            return toolkit.response({
                statusCode: 500,
                errors: err,
                message: 'Internal Server Error',
                errors: [
                    {
                        message: 'Failed to connect to database'
                    }
                ],
                meta: {
                    query: req.query,
                    params: req.params
                },
                data: null
            }).code(500);
        });
    }
}

