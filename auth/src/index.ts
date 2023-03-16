import 'express-async-errors';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
 

const app = express();
app.set('trust proxy',true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: true,
    secureProxy: true,
}));

//primary routes handler
app.use(routes);

app.all('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('connected to mongodb');
    }
    catch(err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('server listening on port 3000');
    });
}

start();