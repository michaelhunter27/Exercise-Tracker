/**
 * Michael Hunter
 * CS 290
 * Assignment 7
 * exercises_model.mjs
 * Based on code from movies_model.mjs in exploration examples
 */

import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);


// Returns the newly created Exercise
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = await new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();

}


// Returns an array of all Exercises that match the filter
const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}


// Updates Exercise with _id specified by filter to match info in update
// Returns the number of Exercises modified (1 if changes were made, or 0 if no changes were made)
const updateExercise = async (filter, update) => {
    const result = await Exercise.updateOne(filter, update);
    // Return an error message if no match was found
    if (result.matchedCount === 0){
        return {"Error": "Not found"};
    }
    return result.modifiedCount;
}


// Deletes the Exercise specified by _id
// Returns number of Exercises deleted (1, or 0 if no Exercise had a matching id)
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}


// Deletes all Exercises that match filter
// Returns the number of Exercises that were deleted
const deleteByFilter = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}


db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


export { createExercise, findExercises, updateExercise, deleteById, deleteByFilter };