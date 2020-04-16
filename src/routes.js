import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

/* Rota sem necessidade de Login */

routes.post('/signin', SessionController.store);
routes.post('/signup', UserController.store);

routes.use(authMiddleware);
/* Rotas com necessidade de Login */

routes.put('/profile', UserController.update);

export default routes;
