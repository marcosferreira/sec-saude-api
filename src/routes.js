import { Router } from 'express';

import users from './User/routes.js';
import benefitis from './Benefits/routes.js';

const routes = Router();

routes.get('/', (req, res) => res.json({ ok: true }));

routes.use(users);
routes.use(benefitis);

export default routes;
