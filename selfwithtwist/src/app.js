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
app.post("/api/notes", async (req, res) => {

    //accepting data 
    let { title, description } = req.body;

    // validations

    if (!title) {
        res.status(400).json({
            messgae: "Title is required"
        });
    }

    if (!description) {
        res.status(400).json({
            messgae: "Description is required"
        });
    }

    if (title.trim().length < 4) {
        res.status(400).json({
            messgae: "Title must be atleat 4 characters long"
        });
    }

    if (description.trim().length < 10) {
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

/*
@routeUsage: to get all the notes
@routeType: GET because of just fetching and sending data back
@dataAccepted No data accepted
*/
app.get("/api/notes", async (req, res) => {

    // fetching data form the DB 
    const notes = await notesModel.find();

    // sending the response
    return res.status(200).json({
        success: true,
        messgae: "Notes fetched Successfully",
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

    //accepitng data
    let id = req.params.id;
    let { title, description } = req.body;

    // Checking if notes exists
    const notes = notesModel.findById(id);

    if(!notes) {
        res.status(409).json({
            messgae: "Note do not exists create one first"
        });
    }

    // updating
    notes.title = title;
    notes.description = description;
    await notes.save();

    // sending response 
    return res.status(200).json({
        success: true,
        messgae: "Notes updated successfully",
        data: {
            notes
        }
    });

})

export default app;