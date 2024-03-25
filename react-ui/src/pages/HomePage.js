import { useState, useEffect } from "react";
import ExerciseTable from "../components/ExerciseTable";
import { useNavigate } from "react-router-dom";


function HomePage({ setExerciseToEdit }) {

    const navigate = useNavigate();

    const [exercises, setExercises] = useState([]);

    const loadExercises = async  () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data)
    }

    useEffect( () =>{
        loadExercises();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'})
        if (response.status === 204){
            const newExercises = exercises.filter((exercise) => exercise._id !== _id);
            setExercises(newExercises);
        } else {
            console.log(`Error: failed to delete exercise with id: ${_id}.  Status ${response.status}`);
        }
    }

    const onEdit = async (exercise) => {
        setExerciseToEdit(exercise);
        navigate("/edit");
    }


    return (
        <div className="HomePage">
            <h2>Home</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
        </div>
    )
};

export default HomePage;