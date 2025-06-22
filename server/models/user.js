import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, default: "user" },
    previousBookings: [{
        hotelId: { type: String, required: true },
        hotelName: { type: String, required: true },
        bookingDate: { type: Date, required: true },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        guests: { type: Number, required: true },
        price: { type: Number, required: true }, // Price in rupees
        status: { type: String, enum: ["confirmed", "cancelled", "completed"], default: "confirmed" }
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
