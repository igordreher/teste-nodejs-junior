import { Router } from 'express';
import userController from 'controllers/userController';

const router = Router();

router.get('/api/v1/users', userController.list);
router.get('/api/v1/users/:user_id', userController.find);

router.post('/api/v1/users', userController.create);
router.patch('/api/v1/users/:user_id', userController.update);

router.delete('/api/v1/users', userController.deleteAll);
router.delete('/api/v1/users/:user_id', userController.delete);


export default router;
