import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import printRoutes from './print/routes/printRoutes.js';
//let cache = apicache.middleware;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
dotenv.config();

const limiter =  new RateLimit({
    windowMs: 15*60*1000,
    max :250,
    delayMs: 0 //disable delays
});
//app.use(cache('5 minutes'));


app.use('/print',printRoutes);

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const opts = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
};

mongoose.connect(CONNECTION_URL,opts)
    .then(() => {
        app.listen(PORT,() => console.log(`Server running on port : ${PORT}`));
        console.log('Connected to MongoDB Database!');
    })
    .catch((error)=>console.log(error.message));