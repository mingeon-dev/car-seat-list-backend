import Router from 'koa-router';
import * as productsCtrl from './products.ctrl';

const products = new Router();

products.get('/', productsCtrl.list);
products.get('/:id', productsCtrl.detail);

export default products;
