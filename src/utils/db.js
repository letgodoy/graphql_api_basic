import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { handleError } from './utils'

dotenv.config();

mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
    useFindAndModify: false,
});

mongoose.set('useCreateIndex', true);

export default connection
    .then(db => db)
    .catch(err => {
        handleError(err, "Erro ao conectao com o banco")
    });