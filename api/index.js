import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();
const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.listen(4000,()=>{
    console.log('server is running o port 3000');
})

// app.use('/api/auth',authRouter);
// app.use('/api/user',userRouter);




app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "internal server error"
    res.status(statusCode).json({
 success:false,
 statusCode,
 message
    })
})
