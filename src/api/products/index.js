import Router from 'koa-router';
import * as productsCtrl from './products.ctrl';

const products = new Router();

products.post('/', productsCtrl.add);
products.get('/', productsCtrl.list);
products.get('/:id', productsCtrl.detail);
products.delete('/:id', productsCtrl.remove);

export default products;
