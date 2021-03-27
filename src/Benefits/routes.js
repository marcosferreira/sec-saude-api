import { Router } from 'express';
import { BenefitsController } from './controllers.js';

const routes = Router();
const benefits = new BenefitsController();

routes.get('/benefits', benefits.index);
routes.post('/benefits', benefits.store);
routes.get('/benefits/:id', benefits.show);
routes.patch('/benefits/:id', benefits.update);
routes.delete('/benefits/:id', benefits.destroy);

export default routes;
