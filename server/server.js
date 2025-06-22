import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// IMPORTANT: Webhook route MUST come before express.json() middleware
app.post('/api/clerk',
    express.raw({ type: 'application/json' }),
    clerkWebhooks
);

// Regular JSON middleware for other routes (after webhook route)
app.use(express.json());
app.use(clerkMiddleware());

// Basic route
app.get('/', (req, res) => res.send("API Working fine!"));

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Webhook endpoint: http://localhost:${PORT}/api/clerk`);
});
