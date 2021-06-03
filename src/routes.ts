import { Router } from 'express';
import userController from 'controllers/userController';
import wrapper from 'services/controllerWrapper';

const router = Router();

router.get('/api/v1/users', wrapper(userController.list));
router.get('/api/v1/users/:user_id', wrapper(userController.find));

router.post('/api/v1/users', wrapper(userController.create));
router.put('/api/v1/users/:user_id', wrapper(userController.update));

router.delete('/api/v1/users', wrapper(userController.deleteAll));
router.delete('/api/v1/users/:user_id', wrapper(userController.delete));


export default router;
