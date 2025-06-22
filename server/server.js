import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";   
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";



connectDB()


const app = express();
app.use(cors())
//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//API for clerkWebhook
app.use("/api/clerk", clerkWebhooks)

app.get('/',(req,res)=> res.send("API Working fine!"))
const PORT = process.envPORT || 3000;


app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
