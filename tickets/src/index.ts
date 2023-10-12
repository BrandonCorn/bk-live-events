import mongoose from 'mongoose';

import { app } from './app';
import { natsClient } from './events/nats-client';

const start = async () => {
    if (!process.env.JWT_SECRET){
        throw new Error('JWT_SECRET must be defined');
    }

    if(!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    try{
        //nats connection
        await natsClient.connect('ticketing', 'lalkdsjfljsd', 'http://nats-srv:4222');
        natsClient.client.on('close', () => {
            console.log('Nats Server has shutdown');
            process.exit();
          });
          process.on('SIGINT', () => natsClient.client.close());
          process.on('SIGTERM', () => natsClient.client.close());
          //mongoose connection
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb');
    }
    catch(err) {
        console.log(err);
    }

    app.listen(3002, () => {
        console.log('server listening on port 3002');
    });
}

start();