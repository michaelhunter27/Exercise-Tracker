import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function AddExercisePage(  ){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [reps, setReps] = useState();
    const [weight, setWeight] = useState();
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const addExercise = async (e) => {
        e.preventDefault();
        const newExercise = {name:name, reps:reps, weight:weight, unit:unit, date:date}
        const response = await fetch(`/exercises`, {
            method: 'POST', 
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 201){
            alert("Exercise successfully added!");
        } else {
            alert(`Unable to create exercise.  Status ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div className="CreateExercisePage">
            <h2>Add Exercise</h2>
            <form>
                <fieldset>
                    <legend>New Exercise</legend>
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
                <button type="submit" onClick={addExercise}>Save</button>
            </form>
        </div>
    )
};

export default AddExercisePage;