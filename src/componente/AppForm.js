import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, {useState,useEffect} from 'react';
import {db} from "./firebase";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.ccs';

const AppForm = (props) => {
    ////////////////////////////////////////////////////////////////////////////
        ////////// CREAR - fnCrear - Guardar //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////    
    const camposRegistro = {nombre:"", edad:"", genero:""};
    const [objeto, setObjeto] = useState(camposRegistro);

    const handleStatusChange = (e) => {      //Manejar cambios en form
    }
       // const {name, value} = e.target;
       // setObjeto({...objeto, [name]:value });
     //   console.log(objeto);
   /// };//////

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();

        if(props.idActual === ""){
        if(validarForm()){
            addDoc(collection(db, 'persona'), objeto);
              console.log("Se guardo registro en DB...");
        }else{
              console.log("NO se guardo...");
        }
    }else{
                //////ACTUALIZAR//////
        await updateDoc(doc(collection(db, "persona"), props.idActual),objeto);
        console.log("se actualizo...");
        props.setIdActual(""); 
                          
    }
    setObjeto(camposRegistro);
} catch (error) {
    console.log ("error en crear o UPDATE", error);
}
    
    const validarForm = () => {
         if(objeto.nombre === ""){
            alert("Escriba nombre...");
            return false;
         }
         return true;
    };

    useEffect(() => {
        if(props.idActual ===""){
           setObjeto({...camposRegistro});

        }else{
           obtenerDatosPorId(props.idActual);
        }
    }, [props.idActual]);

    const obtenerDatosPorId = async(xId) => {
         const objPorId = doc (db, "persona", xId);
         const docPorId = await getDoc(objPorId);
         if (docPorId.exists()){
          setObjeto(docPorId.data());

         }else{
            console.log("no hay doc.......");

         }
    }




    ///////////////////////////////////////////////////////////////////////
    ////////// UPDATE - fnUpdate - Actualizar /////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    return (
        <div>

            <form className= "card card-body" onSubmit={handlesubmit} >
                <button className='btn btn-primary btn-block'>
                    Formulario (AppForm.js)
                </button>
                <div className='form-group input-group'>
                    <div className='imput-group-text bd-light'>

                        <i className='material-icons'>group-add</i>
                 
                    </div>
                    <input type="text" className='form-control' name='Nombres' placeholder='Nombres...'
                    onChange={handleStatusChange} value={objeto.nombre}/>

                </div>
                <div className='form-group input-group clearfix'>
                    <div className='input-group-text bd-light'>
                        <i className='material-icons'>star_half</i>
                        
                    </div>
                    <input type= "texto" className='form-control float-start' name= "edad" placeholder='Edad...'
                        onChange={handleStatusChange} value={objeto.nombre}/>

                </div>

                <div className='form-group input-group'>
                                                     
                    <div className= "input-group-text bd-light">
                        <i className="material-icons">insert_link</i>

                    </div>
                    <input type= "texto" className= "form-control" name= "genero" placeholder= "Genero..."
                        onChange={handleStatusChange} value={objeto.genero}/>
                        
                    </div>
                    <button className= "btn btn-primary btn-block">
                    {props.idActual === "" ? "Guardar" : "Actualizar" }
                </button>
            </form>
            
        </div>
    )
}
}