import mongoose, { SchemaTypes } from 'mongoose';
import categoriesController from '../controllers/categories.controller';

const options = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
      ret.id = ret._id.toHexString();
      delete ret._id;
    }
  }
};

const CategorySchema = new mongoose.Schema(
  {
    id: String,
    num: String,
    name: String,
    parent_num: String
  },
  options
);

CategorySchema.virtual('questions', {
  ref: 'Question',
  localField: 'num',
  foreignField: 'category_num',
  justOne: false
});

CategorySchema.statics = {
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({})
      .populate({ path: 'questions', select: 'category_num' })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export default mongoose.model('Category', CategorySchema);
