import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Set up connection event listeners
        mongoose.connection.on('connected', () => {
            console.log("✅ DB Connected to glen-hotel-booking");
        });

        mongoose.connection.on('error', (err) => {
            console.error("❌ DB Connection Error:", err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("⚠️ DB Disconnected");
        });

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'glen-hotel-booking',
            // Add these options for better connection handling
            serverSelectionTimeoutMS: 10000, // 10 seconds
            socketTimeoutMS: 45000, // 45 seconds
            bufferCommands: false,
            maxPoolSize: 10
        });

        console.log("✅ Connected to database:", mongoose.connection.db.databaseName);

    } catch (error) {
        console.error("❌ DB Connection Error:", error.message);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
