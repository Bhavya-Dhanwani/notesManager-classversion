import mongoose from "mongoose";

function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb connect successfully");
    } catch (err) {
        console.log("Error connecting DB");
    }
}

export default connectDB;