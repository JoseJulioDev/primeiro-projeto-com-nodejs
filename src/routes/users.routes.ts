import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateAvatarUserService from '../services/UpdateAvatarUserService';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password} = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
        name,
        email, 
        password
    });

    // @ts-expect-error
    delete user.password;
    
    return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, 
                  upload.single('file'), async (request, response) => {

    const updateAvatarUser = new UpdateAvatarUserService();

    const user = await updateAvatarUser.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    });

    // @ts-expect-error
    delete user.password;

    return response.json({user});
});

export default usersRouter;