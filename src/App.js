import { useState } from "react";
import AppForm from "./componente/AppForm";


function App() {
  const [idActual, setIdActual]= useState('');
  const [docsBD, setDocsBD] =useState([]);

 <h1>HOLA</h1>
//////LECTURA A BASE DE DATOS/////////////////////////
  const fnRead = () => {
    console.log("Lectura a BD");
  }
  const fnDelet = () => {
    console.log("Eliminar un registro");
  }
  return (
    <center><div style={{background:"orange"}}>
      <AppForm{...{idActual,setIdActual,fnRead}}/>
      
    </div></center>
  );
}

export default App;