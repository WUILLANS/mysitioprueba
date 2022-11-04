import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
////////////////////READ//////////////////////
const[idActual,setIdActual] = useState('');
const[docsBD,setdocsBD] = useState([]);
//////////////////////LECTURA A BD/////////////////////////
const fnRead = () => {
  console.log("lectura a BD");
}
//////////////////////LECTURA A BD/////////////////////////
const fnDelete = () => {
  console.log("Eliminar un registro");
}

  return (
    <div style={{background:"greenyellow", width:358px}}>
     <AppFor{...{idActual,setIdActual,fnRead}} /> 
    </div>
  );
}

export default App;
