import './App.css';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import AddExercisePage from './pages/AddExercisePage';


function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <h1>Exercise App</h1>
          <p>Use this app to track your workouts!</p>
          <Navigation/>
          <Routes>
            <Route path="/" element={ 
              <HomePage  setExerciseToEdit={setExerciseToEdit}/> }></Route>
            <Route path="/edit" element={ 
              <EditExercisePage exerciseToEdit={exerciseToEdit}/> }></Route>
            <Route path="/create" element={ <AddExercisePage />}></Route>
          </Routes>
        </Router>
        
      </header>
      <footer>
        &#169; Michael Hunter 2024
      </footer>
    </div>
  );
}

export default App;
