const joi = require('@hapi/joi');

const db = require('../config/database')

exports.viewUsers = {
    method: 'GET',
    path: '/api/users',
    // la fonction qui va être executer dès qu'une requête est réalisé avec la method get sur le path indiqué.  
    handler: async (req, toolkit) => {
        return db.select('*').from('client_info').then(result => {
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

    },
}

exports.newPanel = {
    method: 'POST',
    path: '/api/panels',
    options: {
        validate: {
            payload: joi.object().keys({
                name: joi.string().required()
            }),
        },
    },
    handler: async (req, toolkit) => {
        return toolkit.response({
            statusCode: 201,
            message: 'Created',
            errors: null,
            meta: {
                query: req.query,
                params: req.params
            },
            data: {
                name: req.payload.name
            }
        }).code(201)
    }
};

exports.newUser = {
    method: 'POST',
    path: '/api/users',
    options: {
        validate: {
            payload: joi.object().keys({
                id: joi.string().uuid(),
                first_name: joi.string(),
                last_name: joi.string(),
                email: joi.string().email().required()
            })
        }
    },
    handler: async (req, toolkit) => {
    return db.insert({
        id: req.payload.id,
        first_name: req.payload.first_name,
        last_name: req.payload.last_name,
        email: req.payload.email
    }).into('users')
        .returning(['id', 'first_name', 'last_name', 'email', 'created_at', 'updated_at'])
        .then(result => {
            return toolkit.response({
                statusCode: 201,
                message: 'Created',
                errors: null,
                meta: {
                    params: req.params,
                    query: req.query
                },
                data: result
            }).code(201);
        })
        .catch(err => {
            return toolkit.response({
                statusCode: 500,
                message: 'Internal Server Error',                
                errors: [
                    {
                        message: "Failed to connect to database"
                    }
                ],
                meta: {
                    params: req.params,
                    query: req.query
                },
                data: null
            }).code(500);
        })
}
}