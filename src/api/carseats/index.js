const Router = require('koa-router');
const carseatsCtrl = require('./carseats.ctrl');

const carseats = new Router();

carseats.get('/', carseatsCtrl.list);
carseats.get('/:id', carseatsCtrl.detail);

module.exports = carseats;
