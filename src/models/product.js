import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  company: String,
  country: String,
  price: Number,
  minAge: Number,
  maxAge: Number,
  group: [String],
  tags: [String],
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
