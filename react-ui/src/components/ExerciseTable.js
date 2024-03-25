import React from "react";
import ExerciseRow from "./ExerciseRow";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

function ExerciseTable({ exercises, onDelete, onEdit }){
    return (
        <table className="ExerciseTable">
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, index) => 
                <ExerciseRow exercise={exercise} key={index} onDelete={onDelete} onEdit={onEdit}/>)}
                <tr>
                    <td colSpan={7}><Link to="/create"><MdAdd /></Link></td>
                </tr>
            </tbody>
        </table>
    )
};

export default ExerciseTable;