import Product from './models/product';
import products from './products.js';

export default async function createProducts() {
  await Product.deleteMany({});
  Product.insertMany(products);
}
