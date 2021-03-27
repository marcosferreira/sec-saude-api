import { Router } from 'express';

import { UserController } from './controllers.js';
import { auth, isAdmin } from './middlewares.js';

const routes = Router();
const controller = new UserController();

routes.get('/users', auth, isAdmin, controller.index);
routes.post('/users', auth, isAdmin, controller.store);
routes.get('/users/:id', auth, isAdmin, controller.show);
routes.patch('/users/:id', auth, isAdmin, controller.update);
routes.delete('/users/:id', auth, isAdmin, controller.destroy);

routes.post('/signup', controller.signup, controller.store);
routes.post('/login', controller.login);
routes.post('/logout', auth, controller.logout);

export default routes;
