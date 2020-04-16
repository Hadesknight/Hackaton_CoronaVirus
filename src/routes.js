import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';

const routes = new Router();

/* Rota sem necessidade de Login */

routes('/signup', UserController.store);

routes.use(authMiddleware);
/* Rotas com necessidade de Login */

export default routes;
