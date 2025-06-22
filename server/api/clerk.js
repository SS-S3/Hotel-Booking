import "dotenv/config";
import connectDB from "../configs/db.js";
import clerkWebhooks from "../controllers/clerkWebhooks.js";

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return clerkWebhooks(req, res);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
