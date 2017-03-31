const path = require('path');

module.exports = server => {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.view('index',{list:require(path.join(__dirname,"..","datas/list.json")).list});
        },
        config: {
            state: {
                parse: false, // parse and store in request.state
                failAction: 'error' // may also be 'ignore' or 'log'
            }
        }
    });


};
