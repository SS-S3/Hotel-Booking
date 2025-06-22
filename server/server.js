import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();

app.use(cors());

// Fix: Isolate webhook route BEFORE express.json()
app.post('/api/clerk', 
  // 1. Raw body parser for webhook route
  express.raw({ type: 'application/json' }),
  // 2. Directly use webhook handler
  clerkWebhooks
);

// Regular JSON middleware for other routes
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send("API Working fine!"));

// Fix: Add missing dot in process.env.PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
