import mongoose from 'mongoose';

import { app } from './app';

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