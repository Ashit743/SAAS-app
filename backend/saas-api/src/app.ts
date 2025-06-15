import express from 'express';
import cors from 'cors';
import userRoute from './routes/users.routes';


const app = express();

//middlewares
app.use(cors());
app.use(express.json());



// routes
app.use('/api/user/', userRoute);

app.get('/', (req, res) => {
  res.send('Hello Worlddddddd!');
});


export default app;


