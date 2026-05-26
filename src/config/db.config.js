import mongoose, { mongo } from "mongoose";

const noteSchema = await mongoose.Schema({
    title: String,
    description: String
});

const nodeModel = await mongoose.model("notes", noteSchema);
export default nodeModel;