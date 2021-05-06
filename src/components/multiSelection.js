import React, { useEffect } from 'react';

export default function MultiSelection(props){


    useEffect(()=>{


    },[props])

        return( 
           <>   

                <input list="data-list" name="browser" id={props.id} ref={props.reference}/>
                <datalist  id="data-list"  style={{width: "100%", borderColor: "#4DF79F"}} placeholder='tipo documento'>
                    {
                       props.options.map((item)=>{

                            return <option value={item}>{item}</option>

                       }) 
                    }
                
                </datalist >

 
           </> 

        );

}

/*

readMe

#Props brief:

*id: a ref for the element
*options: pass an array to create multiples option tags




                    <option value="" style={{color: "gray"}}>-Tipo de Documento-</option>
                    <option value="Sentencia">Sentencia</option>
                    <option value="Avenimiento">Avenimiento</option>
                    <option value="Conciliación">Conciliación</option>
                    <option value="Contestación">Contestación</option>
                    <option value="Medio de prueba">Medio de prueba</option>
                    <option value="Escritura Pública">Escritura Pública</option>
                    <option value="Escritura Privada">Escritura Privada</option>
                    <option value="Inscripción">Inscripción</option>
                    <option value="Comprobante Ingreso Administrativo">Comprobante Ingreso Administrativo</option>
                    <option value="Certificado">Certificado</option>
                    <option value="Comprobante Ingreso Judicial">Comprobante Ingreso Judicial</option>
                    <option value="Boleta Gasto">Boleta Gasto</option>
                    <option value="Notificación Receptor">Notificación Receptor</option>
                    <option value="Demanda">Demanda</option>
                    <option value="Recurso">Recurso</option>
                    <option value="Informe">Informe</option>
                    <option value="Publicación">Publicación</option>
                    <option value="Resolucion fija Audiencia">Resolución (fija Audiencia)</option>
                    <option value="Resolucion Relevante">Resolución Relevante</option>
                    <option value="Documento Otros">Documento Otros</option>
["Sentencia","Avenimiento","Conciliación","Contestación","Medio de prueba","Escritura Pública","Escritura Privada","Inscripción","Comprobante Ingreso Administrativo","Certificado","Comprobante Ingreso Judicial","Boleta Gasto","Notificación Receptor","Demanda","Recurso","Informe",
"Publicación","Resolución (fija Audiencia)","Resolución Relevante","Documento Otros"]
*/


