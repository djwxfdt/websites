const Hapi = require('hapi');
const path = require('path');

const server = new Hapi.Server();

server.connection({port: 3004, host: '127.0.0.1'});

require("./src/routes.js")(server);

server.register(require('vision'), (err) => {
    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/public/images/{path*}',
        handler: {
            directory: {
                path:"./assets/images",
                index: false,
            }
        },
        config: {
            state: {
                parse: false, // parse and store in request.state
                failAction: 'error' // may also be 'ignore' or 'log'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/public/{path*}',
        handler: {
            directory: {
                path: "./public",
                index: false,
            }
        },
        config: {
            state: {
                parse: false, // parse and store in request.state
                failAction: 'error' // may also be 'ignore' or 'log'
            }
        }
    });
});



server.on('request-internal', function (request, event, tags) {

    if (tags.error && tags.state) {
        console.error(event);
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
