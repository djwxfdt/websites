const Pageres = require('pageres');
const path = require('path');
const list = require('./datas/list.json').list;

const pageres = new Pageres({delay: 2})

list.filter(item => item.new).map(item => {
    pageres.src(item.url, ['1280x960'],{crop: true,filename:"<%= url %>"})
})

pageres.dest(path.join(__dirname, "assets/images")).run().then(() => console.log('done'));
