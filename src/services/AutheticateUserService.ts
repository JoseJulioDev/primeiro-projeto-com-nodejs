import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User  from '../models/Users';
import authConfig from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AutheticateUserService {
    public async execute( {email, password}: Request): Promise<Response>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: {email} });

        if(!user){
            throw new Error('Email does not exist.');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error('incorrect password.');
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return  {
            user,
            token
        };
    }
}

export default AutheticateUserService;