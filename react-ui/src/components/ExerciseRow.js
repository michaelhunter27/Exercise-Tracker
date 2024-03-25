import React from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";


function ExerciseRow({ exercise, onDelete, onEdit }){

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdModeEdit className="Edit" onClick={() => onEdit(exercise)}/></td>
            <td><MdDelete className="Delete" onClick={() => onDelete(exercise._id)}/></td>
        </tr>
    )
};

export default ExerciseRow;