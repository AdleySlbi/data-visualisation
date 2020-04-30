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

    // APILink = "https://api.solcast.com.au/world_pv_power/forecasts?api_key=ZOsO1LDZXBUN6ELdSkKCVmR5EEfS6M0N&latitude=46.540079&longitude=1.174053&capacity=6&tilt=30&azimuth=-180&loss_factor=1&format=json";

    // fetch("https://api.solcast.com.au/world_pv_power/forecasts?api_key=ZOsO1LDZXBUN6ELdSkKCVmR5EEfS6M0N&latitude=46.540079&longitude=1.174053&capacity=6&tilt=30&azimuth=-180&loss_factor=1&format=json")
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(err => console.log(err))

    // server.route( require('./routes/users').viewUsers );
    // server.route( require('./routes/users').newPanel );
    // server.route( require('./routes/users').newUser );
    server.route(require('./routes/base').test);
    server.route(require('./routes/solcast').solcast);

    // Ecran mes clients : récupérer tous les clients du conseiller
    server.route(require('./routes/clients').mes_clients);

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();