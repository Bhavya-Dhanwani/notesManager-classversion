import express from "express";
import { config } from "dotenv";
import connecDB from "./config/db.config.js";
import notesModel from "./models/notes.model.js";

config();

const app = express();
app.use(express.json());
await connecDB();

/*
@routeUsage: to crete a new note
@routeType: POST because of creation
@dataAccepted as raw json from the body
*/
app.post("/api/notes", async (req, res) => {

    // accepting the data
    let { title, description } = req.body;

    // validations for the inputs
    if (!title) {
        res.status(400).json({
            message: "Title is required"
        });
    }

    if (!description) {
        res.status(400).json({
            message: "Description is required"
        });
    }

    if (title.trim().length < 4) {
        res.status(400).json({
            message: "Title must be atleast 4 charactes long"
        });
    }

    if (description.trim().length < 10) {
        res.status(400).json({
            message: "Description must be 10 characters long"
        });
    }

    // adding in the DB
    const notes = await notesModel.create({ title, description });

    // sending the response 
    return res.status(201).json({
        success: true,
        message: "Notes created successfully",
        data: {
            notes
        }
    });
});


export default app;