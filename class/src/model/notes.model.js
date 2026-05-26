import mongoose, { mongo } from "mongoose";

const noteSchema = await mongoose.Schema({
    title: String,
    description: String
});

const noteModel = await mongoose.model("notes", noteSchema);
export default noteModel;