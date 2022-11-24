import { collection, onSnapshot, where, query, deleteDoc} from "firebase/firestore";
import react, {useEffect, useState} from "react";
import AppForm from "./componente/AppForm";
import {db} from "./componente/firebase";
import {toast} from 'react-toastify';
import {ToasContainer} from 'react-toastify'
import 'react-toastify/dist/react-toastify';

function App() 
  ///////////////////////////////////////////////////////////////////////
  ////////// READ - fnRead - LECTURA A BD ///////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [docsBD, setDocsBD] = useState([]);
 /////console.log(docsBD);

  const fnRead = () => {
    try{
    const xColeccionConQuery = query(collection(db, "persona"));
    //const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const unsubcribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach( (doc) => {
        xDoc.push({id: doc.id, ...doc.data()});
      });

      setDocsBD(xDoc);
    });



  } catch (error) {
    console.error(error)

  }
}
 // fnRead();

  useEffect( () => {
    fnRead();
  }, [] );

  
  ///////////////////////////////////////////////////////////////////////
  ////////// DELETE - fnDelete - Eliminar registros /////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");

  const fnDelete = async(xId) => {
    if(window.confirm("Confirma para elimnar")){
      await deleteDoc (doc(db, "persona", xId));////////aquii revisar de la guia////////
      toast("Documento eliminado con existo",{
        type:'error',
        autoclose:2000
  })


  if(window.confirm)

  console.log("Se elimino...");
  };

  return(
    <div className="container text-center">
      <div className="card bs-secondary p-3 mt-3">
        <ToastContainer/>
        
        <div className="col-md-12 p-2">
          <div className="card mb-1">
            <h1>mysitioprueba(App.js)</h1>
          </div>
        </div>
        <div className="col-md-12 p-2">
          <AppForm {...{ idActual, setIdActual }} />
        </div>
        <div className="col-md-12 p-2">
          {
            docsBD.map((p) => 
            <div className="card mb-1" key={p.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>N.      - {p.nombre} </h4>
                  <div>
                    <i className="material-icons text-danger"
                     onClick={() => fnDelete(p.id)}>close</i>
                     ......
                    <i className="material-icons text-warning"
                     onClick={() => setIdActual(p.id)}> create</i>
                  </div>
               </div>
               <div className="d-flex justify-contenet">
                 <span>Edad: {p.edad} </span>.....
                 <a href="#"> Genero: {p.genero}</a>
               </div>
             </div>
           </div>
          )
        }
     </div>

    </div>
  </div>
  );
}
   export default App;

    
