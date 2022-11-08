import {collection,doc,getDoc,addDoc,updateD} from "firebase/firestore";
import React  from 'react';
import { useState } from "react";
import firibase, {db} from './firebase';

const AppForm = (props) => {

  ////////REGISTRAR Y ACTUALIZAR////

  const camposRegistro = {nombre:"",edad:'',genero:''}
  const [objeto, setObjeto] = useState(camposRegistro);

  const handlesStatusChange = (e) => {
      const {name,value} = e.target;
      setObjeto({...objeto,[name]:value });
  }
  const handleSubmit = async (e) => {
      e.preventDefault();

      ///////////////REGISTRAR/////////////////////
      if(props.idActual===""){
          if(validarForm()){
             addDoc(collection(db, 'persona'), objeto);
             console.log('Se guardo....');
             
          }else{
              console.log('no se guardo...');
          }
      }else{
      }
      setObjeto(camposRegistro);
          
  };
///////////////////VALIDACION///////////////////////
  const validarForm = () => {
      if(objeto.nombre==="" || /^\s/.test(objeto.nombre)){
          alert("Escriba nombres....");
          return false;

      }
      if(objeto.edad==="" || /^\s/.test(objeto.edad)){
        alert("Escriba edad....");
        return false;

    }
    if(objeto.genero==="" || /^\s/.test(objeto.genero)){
        alert("Escriba genero....");
        return false;

    }
    
      return true;

  };

/////////OBTENER REGISTRO POR idActual


//console.log(objeto);
  return (
    <div style={{background:"#123748",height:"489px",width:"350px",boxShadow: "7px 13px 37px #000", paddingTop:"7px"}}>
    <h3 style={{fontSize: "30px", marginBottom: "0px"}}>Registro</h3>
    <form onSubmit={handleSubmit} style={{ padding:"40px", fontFamily: "calibri"}}>
      <input style={{width:"100%", background:"#123748", padding:"10px", borderRadius:"4px", marginBottom:"20px", border: "2px solid #1f53c5", fontFamily: "calibri", fontSize:"18px", color:"white"}} type="text" name='nombre' placeholder='Ingrese su nombre' onChange={handlesStatusChange} value={objeto.nombre}/> <br />
      <input style={{width:"100%", background:"#123748", padding:"10px", borderRadius:"4px", marginBottom:"20px", border: "2px solid #1f53c5", fontFamily: "calibri", fontSize:"18px", color:"white"}} type="text" name='edad' placeholder='Ingrese su edad' onChange={handlesStatusChange} value={objeto.edad}/> <br />
      <input type="text" name='genero' placeholder='Ingrese su genero' onChange={handlesStatusChange} value={objeto.genero}></input>
      <button style={{width:"100%", background:"#1f53c5", border: "none",padding:"12px", color:"white", margin:"16px 15px", fontSize: "18px", fontFamily: "calibri"}}>
      {props.idActual === ""? "Guardar" : "Actualizar"}
      </button>
    </form>
    </div>
  )
}

export default AppForm;
