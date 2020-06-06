import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

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

export const Address = mongoose.model('Address', AddressSchema);
export const AddressTC = composeWithMongoose(Address);