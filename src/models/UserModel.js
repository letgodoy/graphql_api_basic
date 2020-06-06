import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
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
    // address: {
    //   type: mongoose.ObjectId,
    //   ref: "Address",
    // },
    photo: {
      type: mongoose.ObjectId,
      ref: "File",
    },
    chatsFrom: {
      type: [mongoose.ObjectId],
      ref: "Chat",
    },
    chatsTo: {
      type: [mongoose.ObjectId],
      ref: "Chat",
    },
    commentsTo: {
      type: [mongoose.ObjectId],
      ref: "Comment",
    },
    commentsfrom: {
      type: [mongoose.ObjectId],
      ref: "Comment",
    },
    notifications: {
      type: [mongoose.ObjectId],
      ref: "Notification",
    },
    proposes: {
      type: [mongoose.ObjectId],
      ref: "Propose",
    },
    proposesFrom: {
      type: [mongoose.ObjectId],
      ref: "Propose",
    },
    ranks: {
      type: [mongoose.ObjectId],
      ref: "Rank",
    },
    ranksmaked: {
      type: [mongoose.ObjectId],
      ref: "Rank",
    },
    anuncioses: {
      type: [mongoose.ObjectId],
      ref: "Anuncio",
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

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);