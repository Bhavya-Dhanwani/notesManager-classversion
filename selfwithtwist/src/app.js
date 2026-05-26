import express from "express";
import { config } from "dotenv";
import connecDB from "../../self/src/config/db.config.js";
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
app.post("/api/notes",async (req, res) => {

    //accepting data 
    let { title, description } = req.body;

    // validations

    if(!title) {
        res.status(400).json({
            messgae: "Title is required"
        });
    }

    if(!description) {
        res.status(400).json({
            messgae: "Description is required"
        });
    }

    if(title.trim().length < 4) {
        res.status(400).json({
            messgae: "Title must be atleat 4 characters long"
        });
    }

    if(description.trim().length < 10) {
        res.status(400).json({
            messgae: "Desciption must be 10 characters long"
        });
    }


    // adding in the DB 
    const notes = await notesModel.create({
        title,
        description
    });

    // sending response
    return res.status(201).json({
        success: true,
        messgae: "Notes created Successfully",
        data: {
            notes
        }
    });
});

export default app;