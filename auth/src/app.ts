import 'express-async-errors';
import express from 'express';
import routes from './routes';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
 

const app = express();
app.set('trust proxy',true);
app.use(express.json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' ? true : false
})); 

//primary routes handler
app.use(routes);

app.all('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };