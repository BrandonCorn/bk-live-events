import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'lasjdflh)(*()**lsdj98237'

export class Jwt {
    
    static createToken(payload: string | object) {
        const token = jwt.sign(payload, JWT_SECRET);
        return token;
    }
    static verifyToken(token: string) {

    } 

}