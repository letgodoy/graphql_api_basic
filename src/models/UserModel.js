import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import bcryptjs from 'bcryptjs';

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIND', 'ADMINA'],
      default: 'USER',
    },
    avatar: {
      type: String,
    },
    birthday: {
      type: String,
    },
    description: {
      type: String,
    },
    document: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ['PROFISSIONAL', 'CLIENTE'],
      default: 'CLIENTE',
    },
    phoneverif: {
      type: Boolean,
      default: false,
    },
  },
  {
    colection: 'users',
  });

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

UserSchema.pre('save', function (next) {
  const user = this;
  if (!this.isModified("password")) {
    return next();
  }
  user.password = bcryptjs.hashSync(this.password, 10);
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  const user = this;
  if (!user._update.$set.password) {
    return next();
  }
  user._update.$set.password = bcryptjs.hashSync(this._update.$set.password, 10);
  next();
});

export default mongoose.model('User', UserSchema);