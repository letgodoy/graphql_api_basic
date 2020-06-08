import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const AddressSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    complement: {
      type: String,
    },
    country: {
      type: String,
      default: 'Brasil',
    },
    neighborhood: {
      type: String,
    },
    number: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    street: {
      type: String,
    },
    zipcode: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  {
    colection: 'addresses',
  });

AddressSchema.plugin(timestamps);

AddressSchema.index({ createdAt: 1, updatedAt: 1 });

export default mongoose.model('Address', AddressSchema);