import React from 'react';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';



export default class Cpanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            cases_client_id: ""

        }

        //FUNCIONES ENLAZADAS CON CLASE DE COMPONENTE
        this.postNewClient=this.postNewClient.bind(this);
        this.postNewCase=this.postNewCase.bind(this);
        this.updateCase=this.updateCase.bind(this);
        this.docSubmit=this.docSubmit.bind(this);

        //REFERENCIAS DE FORMULARIO PARA CREAR NUEVO CLIENTE
        this.nombre = React.createRef();
        this.rut = React.createRef();
        this.nacionalidad = React.createRef();
        this.estado_Civil = React.createRef();
        this.profesion = React.createRef();
        this.domicilio = React.createRef();
        this.contacto = React.createRef();
        this.descripcion = React.createRef();
        this.juzgado_institucion = React.createRef();
        this.rol_rit_ruc = React.createRef();
        this.materia = React.createRef();
        this.procedimiento = React.createRef();
        this.objetivo = React.createRef(); 

        //REFERENCIAS DE FORMULARIO ACTUALIZACION CAUSA
        this.dataListInput = React.createRef();
        this.ActualizacionAvanceCausa = React.createRef();
        this.modificacion_rol_rit_ruc = React.createRef();
        this.modificacion_juzgado_institucion = React.createRef();
        this.modificacion_descripcion = React.createRef();
        this.causa_teminada_checkBox = React.createRef(); 

        //REFERENCIAS DOCUMENTO CARGADO
        this.PDFfile = React.createRef();
        //this.fechaFirma = React.createRef(); 
        this.tipoDocumento = React.createRef();
    }

    componentDidMount(){
    
        let arr = [];
        fetch(store.getState().fetchBase + 'casos/17.402.744-7')//SE CARGA LOS DATOS DEL DATALIST
        .then(response => {return response.json();})
        .then(data => {
            this.setState({dataList: data.resp})

            })  
    }

postNewClient()
{
    //FETCH CLIENTES
    let urlClients = store.getState().fetchBase +'clientes/no_rut'
     // post body data 
     let clientData = {
        name: this.nombre.current.value,
        rut: this.rut.current.value,
        nationality: this.nacionalidad.current.value,
        civilStatus: this.estado_Civil.current.value,
        job: this.profesion.current.value,
        address: this.domicilio.current.value,
        contact: this.contacto.current.value,
       };
    // request options
    let options = {
        method: 'POST',
        body: JSON.stringify(clientData),
        headers: {'Content-Type': 'application/json'}};
    // send POST request
    fetch(urlClients, options)
        .then(res => {return res.json()})
        .then(data => {
            this.setState({cases_client_id: parseInt(data.lastId)}, ()=>{

                console.log("callback")
                const urlCasos = store.getState().fetchBase +'casos/no_rut'
                let caseData = { 
                    cases_description: this.descripcion.current.value,
                    cases_rol_rit_ruc: this.rol_rit_ruc.current.value,
                    cases_trial_entity: this.juzgado_institucion.current.value,
                    cases_legalIssue: this.materia.current.value,
                    cases_procedure: this.procedimiento.current.value,
                    cases_objetive: this.objetivo.current.value,
                    cases_client_id: parseInt(this.state.cases_client_id),
                    cases_update: "",
                    cases_activeCase: true
                };
            
                let options2 = {
                    method: 'POST',
                    body: JSON.stringify(caseData),
                    headers: {'Content-Type': 'application/json'}};
            
            
                fetch(urlCasos, options2)
                .then(res => {return res.json()})
                .then(data => console.log("JSON.stringify(data)"));
                           
            }
            
            )}); 
}

postNewCase(){

const urlCasos = store.getState().fetchBase +'casos/no_rut'
    let caseData = { 
        cases_description: this.descripcion.current.value,
        cases_rol_rit_ruc: this.rol_rit_ruc.current.value,
        cases_trial_entity: this.juzgado_institucion.current.value,
        cases_legalIssue: this.materia.current.value,
        cases_procedure: this.procedimiento.current.value,
        cases_objetive: this.objetivo.current.value,
        cases_client_id: parseInt(this.state.cases_client_id),
        cases_update: "",
        cases_activeCase: true
    };

    let options2 = {
        method: 'POST',
        body: JSON.stringify(caseData),
        headers: {'Content-Type': 'application/json'}};


    fetch(urlCasos, options2)
    .then(res => {return res.json()})
    .then(data => console.log("JSON.stringify(data)"));

}

updateCase(){//FETCH WITH PUT METHOD TO UPDATE THE TABLE
    
    const urlClients = store.getState().fetchBase +'clientes/new'//FETCH CON POST A CLIENTES

    //SE OBTIENE NOMBRE DEL INPUTDATA
    let str = this.dataListInput.current.value;
    let indx = str.indexOf("/");
    let substr= str.slice(0,indx);

    //SE OBTIENE CASO_ID DEL INPUTDATA
    let str2 = this.dataListInput.current.value;
    let indx2 = str2.indexOf("%");
    let substr2= str2.slice(indx2+1 ,indx2+(str2.length-indx2));

    const clientData = {
        nombre: substr,
        caso_id: substr2,
        actualizacion: (this.ActualizacionAvanceCausa.current.value === "")? "null" :this.ActualizacionAvanceCausa.current.value,
        caso_rol_rit_ruc: (this.modificacion_rol_rit_ruc.current.value === "")? "null" :this.modificacion_rol_rit_ruc.current.value,
        juzgado_institucion: (this.modificacion_juzgado_institucion.current.value === "")? "null" :this.modificacion_juzgado_institucion.current.value,
        descripcion: (this.modificacion_descripcion.current.value === "")? "null" :this.modificacion_descripcion.current.value,
        causaTerminada: this.causa_teminada_checkBox.current.checked.toString()
 
        };

       // request options
       const options = {
           method: 'PUT',
           body: JSON.stringify(clientData),
           headers: {
               'Content-Type': 'application/json'
           }
       }

    fetch(urlClients, options)
        .then(res => {return res.json()})
        .then(data => JSON.stringify(data));
     
}
docSave(){

    const endpoint = store.getState().fetchBase + "uploadDocument";

    //SE OBTIENE CASO_ID DEL INPUTDATA
    let str = document.getElementById('dataListInput').value;
    console.log(str)
    let indx2 = str.indexOf("%");
    let substr2= str.slice(indx2+1 ,indx2+(str.length-indx2));
    console.log(substr2)

    // SE INSERTAN DATOS DEL DOCUMENTO EN LA BASE DE DATOS ENVIANDOSE AL BACKEND
    const docData = {
        tipoDocumento: document.getElementById('tipoDocumento').value,
        casoId: substr2
        };
        
       // request options
       const docOptions = {
           method: 'POST',
           body: JSON.stringify(docData),
           headers: {
               'Content-Type': 'application/json'
           }
       }
    
    fetch(endpoint, docOptions)
        .then(res => {return res.json()})
        .then(data => JSON.stringify(data));

}
docSubmit(){

    const endpoint = store.getState().fetchBase + "uploadDocument";

    //SE OBTIENE CASO_ID DEL INPUTDATA
    let str2 = this.dataListInput.current.value;
    let indx2 = str2.indexOf("%");
    let substr2= str2.slice(indx2+1, str2.length-indx2+1);

   //SE  ENVIA ARCHIVO AL BACKEND
    const pdf = this.PDFfile.current.files;
    const formData = new FormData();

    formData.append('pdf', pdf[0]);

    fetch(endpoint,{

        method: "PUT",
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        
        console.log(JSON.stringify(data.resp))
    });

 
}

render(){
    return (
        <>
        <div className="row">
            <div className="col-md-1 mt-4"></div>
            <div className="col-md-3 mt-1">

            <div className="mt-3" style={{backgroundColor: "#32D782", borderRadius: "10px", padding: "2%"}}>
                <div className="h5" style={{color: "white",  fontWeight: "500", marginTop: "3%", textAlign: "center"}}>-ELIMINAR CAUSA-</div>
                    
                </div>
            </div>

            <div className="col-md-3" style={{backgroundColor: "#32D782", borderRadius: "10px", marginTop: "2%"}}>
                <form>
                    <div className="h5" style={{color: "white",  fontWeight: "500", textAlign: "center"}}>-ANTECEDENTES CLIENTE-</div>
                    <input style={{width: "100%", borderColor: "#4DF79F"}} id='1' ref={this.nombre} placeholder='  nombre'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='2' ref={this.rut} placeholder='  rut'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='3' ref={this.nacionalidad} placeholder='  nacionalidad'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='4' ref={this.estado_Civil} placeholder='  estado Civil'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='5' ref={this.profesion} placeholder='  profesión'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='6' ref={this.domicilio} placeholder='  domicilio'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='' ref={this.contacto} placeholder='  teléfono/m@il'/>

               
                    <div className="h5" style={{color: "white",  fontWeight: "500", textAlign: "center"}}>-ANTECEDENTES CASO-</div>
                    <textarea style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='7' ref={this.descripcion}  placeholder='  descripcion' /><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='8' ref={this.juzgado_institucion} placeholder='  juzgado/institucion'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='9' ref={this.rol_rit_ruc} placeholder='  rol/rit/ruc'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='10' ref={this.materia} placeholder='  materia'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='11' ref={this.procedimiento} placeholder='  procedimiento'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='12' ref={this.objetivo} placeholder='  objetivo'/>
                    <input style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='crear_nuevo_cliente' type='button' value='NUEVO CLIENTE' onClick={this.postNewClient}/>

                </form>

            </div>
            <div className="col-md-3">
        
                <div className="mt-4" style={{backgroundColor: "#32D782", borderRadius: "10px", padding: "2%"}}>
                <div className="h5" style={{color: "white",  fontWeight: "500", marginTop: "3%", textAlign: "center"}}>-ACTUALIZACIÓN CAUSA-</div>
                    <input list="casos" id="dataListInput" style={{width: "100%", borderColor: "#4DF79F"}} ref={this.dataListInput}/>
                    <datalist id="casos" >
                    
                    {this.state.dataList.map((item, index) => {
                            return <option value={`${item.clients_name} / ${item.cases_rol_rit_ruc}`}/>
                        })
                    })}

                    </datalist><br />
                    <textarea ref={this.ActualizacionAvanceCausa} className="mt-3" style={{width: "100%", borderColor: "#4DF79F"}} placeholder='  actualizar avance de la causa'/><br />
                    <input ref={this.modificacion_rol_rit_ruc} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar rol/rit/ruc causa'/><br />
                    <input ref={this.modificacion_juzgado_institucion} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar Juzgado/Institución'/><br />
                    <textarea ref={this.modificacion_descripcion} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar descripcion caso'/><br />
                    <label className="checkbox-inline text-white font-weight-bold">Causa Terminada   <input ref={this.causa_teminada_checkBox} type="checkbox" style={{width: "20px", height: "20px"}}/></label>

                    <input  style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='actiualizar_causa' type='button' value='ACTUALIZAR CAUSA' onClick={this.updateCase}/>
                    
                </div>
{/**------------------------------------------------------------------------------------------------ */}
                <div className="mt-4" style={{backgroundColor: "#32D782", borderRadius: "10px", padding: "2%"}}>
                    <form>
                        <input ref={this.PDFfile} type="file" accept=".pdf"/> 
                        <select id="tipoDocumento" ref={this.tipoDocumento} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  tipo documento'>
                            <option value="" style={{color: "gray"}}>-Tipo de Documento-</option>
                            <option value="Sentencia">Sentencia</option>
                            <option value="Escritura Pública">Escritura Pública</option>
                            <option value="Escritura Privada">Escritura Privada</option>
                            <option value="Inscripción">Inscripción</option>
                            <option value="Certificado de Remision">Certificado de Remision</option>
                            <option value="Certificado">Certificado</option>
                            <option value="Comprobante Ingreso">Comprobante Ingreso</option>
                            <option value="Boleta Gasto">Boleta Gasto</option>
                            <option value="Notificación Receptor">Notificación Receptor</option>
                            <option value="Demanda">Demanda</option>
                            <option value="Recurso">Recurso</option>
                            <option value="Informe">Informe</option>
                            <option value="Publicación">Publicación</option>
                            <option value="Resolucion fija Audiencia">Resolución (fija Audiencia)</option>
                            <option value="Resolucion Relevante">Resolución Relevante</option>
                            <option value="Documento Otros">Documento Otros</option>
                        </select><br />   
                        <input  onClick={this.docSave} value='GUARDAR DATOS'  type='button' style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}}/>
                        <input  onClick={this.docSubmit} value='CARGAR DOCUMENTO'  type='button' style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}}/>
                    </form>
                </div>
{/**------------------------------------------------------------------------------------------------ */}
                
            </div>
            <div className="col-md-1 mt-4"></div>
        </div>    
        </>
        
    );

}

}

