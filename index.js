import express from 'express';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import userRouter from './routes/userRouter.js';


const mongoURI ="mongodb://admin:hello123@ac-4vc5awv-shard-00-00.pzynyfj.mongodb.net:27017,ac-4vc5awv-shard-00-01.pzynyfj.mongodb.net:27017,ac-4vc5awv-shard-00-02.pzynyfj.mongodb.net:27017/?ssl=true&replicaSet=atlas-m7vvpu-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err)
})

const app = express()

app.use(express.json())

app.use('/students', studentRouter)
app.use('/users', userRouter)

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})