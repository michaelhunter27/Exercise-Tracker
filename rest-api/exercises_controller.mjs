/**
 * Michael Hunter
 * CS 290
 * Assignment 7
 * exercises_controller.mjs
 * Based on code from movies_controller.mjs in exploration examples
 */

import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

// checks that all fields are valid
const validateExercise = ({name, reps, weight, unit, date}) => {
    const numberFormat = /^\d*$/;
    const dateFormat = /^\d\d-\d\d-\d\d$/;
    if(typeof name !== 'string' || name.length < 1){
        return false;
    } else if(numberFormat.test(reps) === false || reps <= 0){
        return false;
    } else if(numberFormat.test(weight) === false || weight <= 0){
        return false;
    } else if( !(unit === 'lbs' || unit === 'kgs') ){
        return false;
    } else if(typeof date !== 'string' || dateFormat.test(date) === false){
        return false;
    } else {
        return true;
    }
}


// Create endpoint
app.post("/exercises", asyncHandler( async (req, res) =>{
    if (validateExercise(req.body)){
        const result = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
        res.status(201).json(result);
    } else {
        res.status(400).json({"Error": "Invalid Request"});
    }
}));


// Retrieve endpoints
// Retrieve a single Exercise by id
app.get("/exercises/:id", asyncHandler( async (req, res) => {
    const result = await exercises.findExercises({_id: req.params.id});
    if (result[0] !== undefined){
        res.status(200).send(result[0]);
    }
    // Set status to 404 if id is not found
    else{
        res.status(404).json({Error: "Not found"});
    }
}));


// Retrieve all exercises
app.get("/exercises", asyncHandler( async (req, res) =>{
    let filter = {};
    const result = await exercises.findExercises(filter);
    res.send(result);
}));


// Update endpoint
app.put("/exercises/:id", asyncHandler( async (req, res) =>{
    const update = {name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date}
    if (validateExercise(update) === false){
        res.status(400).json({Error: "Invalid request"});
    } else {
        const result = await exercises.updateExercise({ _id: req.params.id }, update);

        // Set status to 404 if id is not found
        if (result.Error === "Not found") {
            res.status(404).json({ Error: "Not found" });
        }
        else {
            const updatedExercise = await exercises.findExercises({ _id: req.params.id });
            res.status(200).json(updatedExercise[0]);
        }
    }
}));


// Delete endpoint
app.delete("/exercises/:id", asyncHandler( async (req, res) =>{
    const result = await exercises.deleteById({_id: req.params.id});
    if (result === 1){
        res.status(204).send();
    }
    // Set status to 404 if id was not found
    else{
        res.status(404).send();
    }
}));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});