import {useState} from "react";
import { useNavigate } from "react-router-dom";

function EditExercisePage({ exerciseToEdit }){
    const navigate = useNavigate();
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const editExercise = async(e) => {
        e.preventDefault();
        const editedExercise = {name:name, reps:reps, weight:weight, unit:unit, date:date}
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT', 
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200){
            alert("Exercise successfully edited!");
        } else if (response.status === 400){
            alert(`Unable to edit exercise.  Bad Request.`);
        } else if (response.status === 404){
            alert(`Unable to edit exercise.  Exercise not found.`);
        }
        navigate("/");
    };

    return (
        <div className="EditExercisePage">
            <h2>Edit Exercise</h2>
            <form>
                <fieldset>
                    <legend>Edit Exercise</legend>
                    <p>
                        <label>Name</label>
                        <input type="text" value={name}
                            onChange={e => setName(e.target.value)} />
                    </p>
                    <p>
                        <label>Reps</label>
                        <input type="number" value={reps}
                            onChange={e => setReps(e.target.value)} />
                    </p>
                    <p>
                        <label>Weight</label>
                        <input type="number" value={weight}
                            onChange={e => setWeight(e.target.value)} />
                    </p>
                    <p>
                        <label>Units</label>
                        <select value={unit} onChange={e => setUnit(e.target.value)} >
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                        </select>
                    </p>
                    <p>
                        <label>Date</label>
                        <input type="text" value={date}
                            onChange={e => setDate(e.target.value)} />
                    </p>
                </fieldset>
                <button type="submit" onClick={editExercise}>Save</button>
            </form>
        </div>
    )
};

export default EditExercisePage;