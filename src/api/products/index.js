const Router = require('koa-router');
const productsCtrl = require('./products.ctrl');

const products = new Router();

products.get('/', productsCtrl.list);
products.get('/:id', productsCtrl.detail);

module.exports = products;
