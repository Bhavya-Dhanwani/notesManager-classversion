import mongoose, { mongo } from "mongoose";

const noteSchema = await mongoose.Schema({
    title: String,
    description: String
});

const noteModel = await new mongoose.model("notes", noteSchema);
export default noteModel;