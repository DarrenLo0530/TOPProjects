import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

CategorySchema
  .virtual('url')
  .get(() => `/category/${this._id}`);

export default mongoose.model('Category', CategorySchema);
