const sampson = require('./sampson');

const list = [];

sampson.list.map(item=>{
    item.author = "Sampson Du";
    list.push(item);
});

module.exports = list;
