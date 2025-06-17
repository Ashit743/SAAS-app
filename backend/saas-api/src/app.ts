import express from 'express';
import cors from 'cors';
import userRoute from './routes/users.routes';
import { globalErrorHandler } from './middleware/globalErrorHandler';


const app = express();

//middlewares
app.use(cors());
app.use(express.json());



// routes
app.use('/api/user/', userRoute);

app.get('/', (req, res) => {
  res.send('Hello Worlddddddd!');
});


// Global error handler
app.use(globalErrorHandler);


export default app;


