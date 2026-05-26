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

/*
@routeUsage: to get all the notes
@routeType: GET because of just fetching and sending data back
@dataAccepted No data accepted
*/
app.get("/api/notes", async (req, res) => {

    //getting data form Db 
    const notes = await notesModel.find();

    // sending the res
    return res.status(200).json({
        success: true,
        message: 'Notes fethced Successfully',
        data: {
            notes
        }
    });
});

/*
@routeUsage: to upate a note 
@routeType: PATCH beacuse of updation
@dataAccepted as raw json from the body and id accepted as params
*/
app.patch("/api/notes/:id", async (req, res) => {

    // accepting the data 
    let id = req.params.id;
    let { title, description } = req.body;

    // Getting the notes and checking if esists.
    const notes = notesModel.findById(id);

    if(!notes) {
        res.status(400).json({
            messgae: "Note not found create it first"
        });
    }

    // Updating the note
    notes.title = title;
    notes.description = description;
    await notes.save();

    // sending the response
    res.status(200).json({
        success: true,
        message: "Note updated successfully",
        data: {
            notes
        }
    })
})

export default app;