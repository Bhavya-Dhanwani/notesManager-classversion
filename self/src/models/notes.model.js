import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: String,
    description: String
});

const notesModel = await new mongoose.model("notes", notesSchema);
export default notesModel;