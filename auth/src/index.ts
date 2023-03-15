import express from 'express';
const app = express();
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

app.use(express.json());

//primary routes handler
app.use(routes);

app.all('*', () => {
    throw new NotFoundError();
})

app.use(errorHandler)



app.listen(3000, () => {
    console.log('server listening on port 3000');
});