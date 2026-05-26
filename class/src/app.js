import express, { json } from "express";
import { config } from "dotenv"
import connectDB from "./config/db.config.js";
import noteModel from "./model/notes.model.js";
config();

const app = express();
await connectDB();


/*
@routeUsage: to crete a new note
@routeType: POST because of creation
@dataAccepted as raw json from the body
*/
app.post("/api/notes", async (req, res) => {

    // accepting data
    let { title, description } = req.body;

    //applying validations 
    if (!title) {
        res.status(400).json({
            messgae: "Title is required"
        });
    }

    if (!description) {
        res.status(400).json({
            messgae: 'Description is require.'
        });
    }

    if (title.trim().length < 4) {
        res.status(400).json({
            message: "Title must be atleast 4 characters long."
        });
    }

    if (description.trim().length < 10) {
        res.status(400) / json({
            message: "Description must be atleat 10 characters long."
        });
    }

    // Adding it ot the DB
    const notes = await noteModel.create({
        title,
        description
    });


    //sendind response
    return res.status(201).json({
        success: true,
        message: "Notes created Successfully",
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

    // fetching all notes from the database
    const notes = await noteModel.find();


    // sending the notes in the response.
    return res.status(200).json({
        success: true,
        messgae: "Notes fetched Successfully",
        data: {
            notes
        }
    })
});


export default app;