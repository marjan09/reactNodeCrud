import './App.css';
import React from 'react'
import Navbar from "./comp/NavBar/Navbar";
import ListPerson from './comp/listPerson';
// import NavBar from './comp/navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        < ListPerson />
      </div>
    </>
  );
}

export default App;
