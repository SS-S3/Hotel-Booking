import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };


        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;

   
        const userData = {
            _id: data.id, 
            email: data.email_addresses[0].email_address, 
            username: data.first_name + " " + data.last_name,
            image: data.image_url, 
            previousBookings: [] 
        };

        switch (type) {
            case "user.created": {
                await User.create(userData);
                console.log("User created:", userData);
                break;
            }
            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData);
                console.log("User updated:", userData);
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);  
                console.log("User deleted:", data.id);
                break;
            }
            default:
                break;
        } 
        console.log('Creating user with data:', userData);
        await User.create(userData);
        console.log('User created successfully');

        res.json({ success: true, message: "Webhook Received" });
    } catch (error) {
        console.log("Webhook error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }


};

export default clerkWebhooks;
