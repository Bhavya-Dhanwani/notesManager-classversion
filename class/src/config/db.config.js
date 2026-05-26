import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Mongo Db");
    }catch(err) {
        console.log('Error connecting the DB')
    }
}

export default connectDB;