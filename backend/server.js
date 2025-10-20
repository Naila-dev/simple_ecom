import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes.js'; 

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => console.log("MONGO_URI is:", process.env.MONGO_URI) )
.catch(err => console.log(err));

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);