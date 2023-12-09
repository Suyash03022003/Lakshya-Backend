import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongodbURL } from './config.js'
import cors from 'cors';

import UserRoutes from './routes/UserRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello! This is Lakshya - Backend!');
});

app.use('/user', UserRoutes);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App Connected to the database!');
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })