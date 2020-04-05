const Router = require('koa-router');
const products = require('./products');

const api = new Router();

api.use('/products', products.routes());

module.exports = api;
