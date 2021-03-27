import jwt from 'jsonwebtoken';
import { User } from './models.js';

export async function auth(request, response, next) {
  const token = request.headers['x-access-token'] || request.headers['authorization'];
  if (!token) {
    return response.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return response.status(400).json({ message: 'User is not logged in' });
    }
   
    request.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
    return next();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}

export function isAdmin(request, response, next) {
  if (!request.user.isAdmin) {
    return response.status(401).json({ message: 'Only administrators can perform this action' });
  }

  return next();
}
