import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  url: String,
  urlToImage: String,
  company: String,
  country: String,
  minAge: Number,
  maxAge: Number,
  group: [String],
  tags: [String],
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
