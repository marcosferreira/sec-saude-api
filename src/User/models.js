import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    isAdmin: this.isAdmin,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

  return token;
};

const User = model('User', UserSchema);

function userValidate(user) {
  const schema = {
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    cpf: Joi.string().min(11).max(11).required(),
    password: Joi.string().min(3).max(255).required(),
  };

  return Joi.validate(user, schema);
}

export { User, userValidate };
