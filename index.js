import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';


const mongoURI ="mongodb://admin:hello123@ac-4vc5awv-shard-00-00.pzynyfj.mongodb.net:27017,ac-4vc5awv-shard-00-01.pzynyfj.mongodb.net:27017,ac-4vc5awv-shard-00-02.pzynyfj.mongodb.net:27017/?ssl=true&replicaSet=atlas-m7vvpu-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err)
})

const app = express()

app.use(express.json())

app.use(
    (req,res,next)=>{
    const authorizationHeaders = req.header("authorization")
    if(authorizationHeaders){
        const token = authorizationHeaders.replace("Bearer ", "")
        console.log(token)

        jwt.verify(token,'secretKey96$2025',
            (error, content) => {
                if(content == null){
                    console.error("Invalid token")
                    res.json(
                        {
                            message : "Invalid token"
                        }
                    )
                    
                }else{
                    console.log(content)
                    req.user = content
                    next()
                }
            }
        )
    } else{
        next()
    }

    
}
)
app.use('/users', userRouter)
app.use('/products', productRouter)

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})