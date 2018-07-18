import mongoose, {
  SchemaTypes
} from 'mongoose';


const options = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id.toHexString();
      delete ret._id;
    }
  }
};

const CategorySchema = new mongoose.Schema({
    id: String,
    num: String,
    name: String,
    parent_num: { type: SchemaTypes.String, ref: 'Category', default: null }
  },
  options
);

CategorySchema.statics = {
  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find({})
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

export default mongoose.model('categories', CategorySchema);
