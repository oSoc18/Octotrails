import mongoose, { SchemaTypes } from 'mongoose';

import { SchemaOptions } from '../helpers/utils';

const CategorySchema = new mongoose.Schema(
  {
    id: String,
    num: String,
    name: String,
    parent_num: { type: String, default: null }
  },
  SchemaOptions
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
