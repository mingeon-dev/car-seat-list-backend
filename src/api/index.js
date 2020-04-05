const Router = require('koa-router');
const carseats = require('./carseats');

const api = new Router();

api.use('/carseats', carseats.routes());

module.exports = api;
