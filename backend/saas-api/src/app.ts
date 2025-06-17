import express from 'express';
import cors from 'cors';
import userRoute from './routes/auth.routes';
import { globalErrorHandler } from './middleware/globalErrorHandler';


const app = express();

//middlewares
app.use(cors());
app.use(express.json());



// routes
app.use('/api/v1', userRoute);

// Global error handler
app.use(globalErrorHandler);


export default app;


