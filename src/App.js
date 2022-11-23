import { async } from "@firebase/util";
import { collection, onSnapshot, where, query, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AppForm from "./componente/AppForm";
import {db} from "./componente/firebase";

function App() {  
  ///////////////////////////////////////////////////////////////////////
  ////////// READ - fnRead - LECTURA A BD ///////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [docsBD, setDocsBD] = useState([]);
  //console.log(docsBD);

  const fnRead = () => {
    const xColeccionConQuery = query(collection(db, "persona"));
    //const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const unsubcribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach( (doc) => {
        xDoc.push({id: doc.id, ...doc.data()});
      });

      setDocsBD(xDoc);
    });
  }

  fnRead();
/*
  useEffect( () => {
    
  }, [] );
  */
  ///////////////////////////////////////////////////////////////////////
  ////////// DELETE - fnDelete - Eliminar registros /////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");

  const fnDelete = async(xId) => {
  if(window.confirm("esta seguro que desea elimnar...?")){
    await deleteDoc (doc(db, "persona", xId))////////aquii revisar de la guia////////

  }


  if(window.confirm)

    console.log("Se elimino...");
  };

  return (
    <div style={{width:"350px", background:"greenyellow", padding:"10px"}}>
      <h1>sitiocopia2a3 (App.js)</h1>
      <h3>READ / DELETE</h3>
      <AppForm {...{idActual, setIdActual, fnRead}} />
      {
        docsBD.map((p) => 
          <p key={p.id}>
           {p.nombre}
           <span onClick= {() => fnDelete(p.id)} > x </span>
           ......
           <span onClick= {() => setIdActual(p.id)} > A </span>
  
             
          </p> 
        )
      }      
    </div>
  );
}

export default App;