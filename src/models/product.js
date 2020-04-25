import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  country: String,
  price: Number,
  tags: [String],
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
