import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export class Jwt {
    
    static createToken(payload: string | object) {
        const token = jwt.sign(payload, JWT_SECRET);
        return token;
    }
    

    static verifyToken(token: string) {
        return jwt.verify(token, JWT_SECRET)
    } 

}