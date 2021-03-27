import bcrypt from 'bcrypt';

import { CRUD, validateCPF } from '../utils.js';
import { User } from './models.js';

export class UserController extends CRUD {
  constructor() {
    super(User);
  }

  async index(request, response) {
    const user = await User.findById(request.user._id).select('-password');
    return response.status(200).json(user);
  }

  async store(request, response) {
    try {
      if (!validateCPF(request.body.cpf)) {
        return response.status(500).json({ message: 'Invalidate CPF' });
      }
      request.body.password = await bcrypt.hash(request.body.password, 8);

      const existAdmin = await User.findOne({ isAdmin: true });
      !existAdmin ? (request.body.isAdmin = true) : (request.body.isAdmin = false);

      const user = await User.create(request.body);

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      if (request.body.password) {
        request.body.password = await bcrypt.hash(request.body.password, 8);
      }

      if (request.user._id === request.params.id) {
        const countAdmin = await User.countDocuments({ isAdmin: true });
        if (countAdmin < 2) {
          if (request.body.isAdmin) {
            return response.status(401).json({
              message: 'There is only a single administrator, so it is not possible to update the data of the same',
            });
          }
        }
      }

      await User.findOneAndUpdate(request.params.id, request.body);

      return response.status(200).json({ message: 'User successfully updated' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async destroy(request, response) {
    try {
      if (request.user._id === request.params.id) {
        const countAdmin = await User.countDocuments({ isAdmin: true });
        if (countAdmin < 2) {
          return response.status(401).json({
            message: 'There is only a single administrator, so it is not possible to update the data of the same',
          });
        }
      }

      await User.findOneAndDelete({ _id: request.params.id });

      return response.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async signup(request, response, next) {
    try {
      const isAdmin = await User.findOne({ isAdmin: true });

      if (isAdmin) {
        return response.status(401).json({
          message: 'you cannot write yourself, contact your system administrator to perform this action',
        });
      }

      return next();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async login(request, response) {
    try {
      const user = await User.findOne({ cpf: request.body.cpf });
      if (!user) return response.status(401).json({ message: 'User not found' });

      const comparePassword = await bcrypt.compare(request.body.password, user.password);
      if (!comparePassword) response.status(401).json({ message: 'Password error' });

      const token = user.generateAuthToken();
      const login = await User.findOneAndUpdate({ cpf: request.body.cpf }, { token });

      return response.header('x-auth-token', token).json({
        _id: login._id,
        firstname: login.firstname,
        cpf: login.cpf,
      });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async logout(request, response) {
    try {
      const token = request.headers['x-access-token'] || request.headers['authorization'];

      await User.findOneAndUpdate({ token }, { token: null });

      return response.status(200).json({ message: 'successfully logged out' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
