import { Router } from 'express';
import { authmiddlewares } from '../middlewares/authmiddlewares';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/user', UserController.getUsers);
userRouter.post('/user', UserController.createUser);
userRouter.delete('/user/:id', UserController.deleteUser);
userRouter.put('/user/:email', UserController.updateUser);

userRouter.post('/user/login', UserController.login);

userRouter.get('/user/profile', authmiddlewares, UserController.getProfile);

export default userRouter;
