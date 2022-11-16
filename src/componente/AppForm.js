import {collection,doc,getDoc,addDoc,updateD} from "firebase/firestore";
import React  from 'react';
import { useState } from "react";
import firibase, {db} from './firebase';

const AppForm = (props) => {

  ////////REGISTRAR Y ACTUALIZAR////

  const camposRegistro = {URL:"",Nombre:'',Descripcion:''}
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
             addDoc(collection(db, 'favoritos'), objeto);
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
      if(objeto.URL==="" || /^\s/.test(objeto.URL)){
          alert("Escriba URL....");
          return false;

      }
      if(objeto.Nombre==="" || /^\s/.test(objeto.Nombre)){
        alert("Escriba nombre....");
        return false;

    }
    if(objeto.Descripcion==="" || /^\s/.test(objeto.Descripcion)){
        alert("Escriba descripcion....");
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
      <input style={{width:"100%", background:"#123748", padding:"10px", borderRadius:"4px", marginBottom:"20px", border: "2px solid #1f53c5", fontFamily: "calibri", fontSize:"18px", color:"white"}} type="text" name='URL' placeholder='Ingrese su URL' onChange={handlesStatusChange} value={objeto.URL}/> <br />
      <input style={{width:"100%", background:"#123748", padding:"10px", borderRadius:"4px", marginBottom:"20px", border: "2px solid #1f53c5", fontFamily: "calibri", fontSize:"18px", color:"white"}} type="text" name='Nombre' placeholder='Ingrese su Nombre' onChange={handlesStatusChange} value={objeto.Nombre}/> <br />
      <input type="text" name='Descripcion' placeholder='Ingrese su Descripcion' onChange={handlesStatusChange} value={objeto.Descripcion}></input>
      <button style={{width:"100%", background:"#1f53c5", border: "none",padding:"12px", color:"white", margin:"16px 15px", fontSize: "18px", fontFamily: "calibri"}}>
      {props.idActual === ""? "Guardar" : "Actualizar"}
      </button>
    </form>
    </div>
  )
}

export default AppForm;
