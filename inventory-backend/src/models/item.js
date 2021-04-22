import mongoose from 'mongoose';

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, min: 0 },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  stockQuantity: { type: Number, min: 0 },
});

ItemSchema
  .virtual('url')
  .get(function getId() { return `/item/${this._id}`; });

export default mongoose.model('Item', ItemSchema);
