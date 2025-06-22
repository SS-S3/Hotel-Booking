import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("DB Connected to glen-hotel-booking"));
        

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'glen-hotel-booking' 
        });
        
        console.log("Connected to database:", mongoose.connection.db.databaseName);
    } catch (error) {
        console.log("DB Connection Error:", error.message);
    }
};

export default connectDB;
