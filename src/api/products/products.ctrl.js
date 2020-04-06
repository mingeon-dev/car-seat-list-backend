import Product from '../../models/product';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

export const add = async (ctx) => {
  const { name, country, price, isofix } = ctx.request.body;
  const product = new Product({
    name,
    country,
    price,
    isofix,
  });
  try {
    await product.save();
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  try {
    const products = await Product.find().exec();
    ctx.body = products;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const detail = async (ctx) => {
  const { id } = ctx.params;
  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      ctx.status = 404;
      return;
    }
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Product.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
