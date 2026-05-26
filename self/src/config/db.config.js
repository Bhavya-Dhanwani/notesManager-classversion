import mongoose from "mongoose";

async function connecDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo Db Connected");
    } catch (err) {
        console.log("Error Connecting DB")
    }
}

export default connecDB;