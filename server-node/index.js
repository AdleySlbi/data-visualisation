'use strict';

require('dotenv').config()
const Hapi = require('@hapi/hapi');
const fetch = require('node-fetch');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    server.route( require('./routes/users').viewUsers );
    // server.route( require('./routes/users').newPanel );
    // server.route( require('./routes/users').newUser );
    server.route(require('./routes/base').test);
    server.route(require('./routes/solcast').solcast);

    // Ecran mes clients : récupérer tous les clients du conseiller
    server.route(require('./routes/clients').mes_clients);
    server.route(require('./routes/clients').mes_clients_filters);

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();