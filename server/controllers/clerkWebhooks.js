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

    // Use the raw body (Buffer) for verification!
    const payload = req.body; // Buffer, not string or object

    // Verify the webhook signature
    const evt = whook.verify(payload, headers);

    // evt contains the parsed JSON payload
    const { data, type } = evt;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: (data.first_name || "") + " " + (data.last_name || ""),
      image: data.image_url,
      previousBookings: []
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("User created:", userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated:", userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id);
        break;
      default:
        break;
    }

    res.json({ success: true, message: "Webhook Received" });
  } catch (error) {
    console.log("Webhook error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
