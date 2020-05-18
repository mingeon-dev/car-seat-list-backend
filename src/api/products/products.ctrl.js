import Product from '../../models/product';
import mongoose from 'mongoose';
import Joi from 'joi';

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
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    company: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { name, company, country, price, tags } = ctx.request.body;
  const product = new Product({
    name,
    company,
    country,
    price,
    tags,
  });
  try {
    await product.save();
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  const PER_PAGE = 20;
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, company } = ctx.query;
  const query = {
    ...(tag ? { tags: tag } : {}),
    ...(company ? { company: company } : {}),
  };

  try {
    const products = await Product.find(query)
      .limit(PER_PAGE)
      .skip((page - 1) * PER_PAGE)
      .exec();
    const productCount = await Product.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(productCount / PER_PAGE));
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

export const like = async (ctx) => {
  const { id } = ctx.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      {
        new: true,
      },
    ).exec();
    if (!product) {
      ctx.status = 404;
      return;
    }
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};
