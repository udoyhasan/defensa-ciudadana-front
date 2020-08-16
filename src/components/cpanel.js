import React from 'react';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';



export default class Cpanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            cases_client_id: "",
            documentLastRowInserted: ""

        }

        //FUNCIONES ENLAZADAS CON CLASE DE COMPONENTE
        this.postNewClient=this.postNewClient.bind(this);
        this.updateCase=this.updateCase.bind(this);
        this.docSubmit=this.docSubmit.bind(this); 
        this.copy=this.copy.bind(this);

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
        this.ActualizacionTareaPendiente = React.createRef();
        this.modificacion_rol_rit_ruc = React.createRef();
        this.modificacion_juzgado_institucion = React.createRef();
        this.modificacion_descripcion = React.createRef();
        this.causa_teminada_checkBox = React.createRef(); 

        //REFERENCIAS DOCUMENTO CARGADO
        this.PDFfile = React.createRef();
        this.tipoDocumento = React.createRef();
    }

    componentDidMount(){
    
        
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
                        cases_activeCase: true,
                        cases_lawyer_id: 1,
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

    updateCase(){//FETCH WITH PUT METHOD TO UPDATE THE TABLE

        const urlClients = store.getState().fetchBase +'casos/no_rut'//FETCH CON POST A CLIENTES

        //SE OBTIENE NOMBRE DEL INPUTDATA
        let str = this.dataListInput.current.value;
        let indx = str.indexOf("/");
        let nombre= str.slice(0,indx-1);
        //SE OBTIENE ROL DEL INPUTDATA
        let nameStart = str.indexOf('%');
        let rol= str.slice(indx+2 ,nameStart);

   

        const clientData = {
            selected: rol,
            cases_rol_rit_ruc: this.modificacion_rol_rit_ruc.current.value,
            cases_update: this.ActualizacionAvanceCausa.current.value,
            cases_pendingTask: this.ActualizacionTareaPendiente.current.value,
            cases_trial_entity: this.modificacion_juzgado_institucion.current.value,
            cases_description: this.modificacion_descripcion.current.value,
            cases_activeCase: (this.causa_teminada_checkBox.current.checked == false)?1: 0
    
            };

            console.log(clientData.cases_activeCase)

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
            .then(data => {
                console.log(JSON.stringify(data))
                fetch(store.getState().fetchBase + 'casos/17.402.744-7')//RELOAD THE DATA WITH UPDATE
                .then(response => {return response.json();})
                .then(data => {
                    this.setState({dataList: data.resp})
                
            }) 
            });
        
        
        
    }

    docSubmit(){
        const casesEndpoint = store.getState().fetchBase + "casos/";//PRIMERO SE HACE GET A CASOS PARA TRAER TODOS LOS CASOS DEL CLIENTE

        //SE OBTIENE RUT DEL INPUTDATA
        let str = this.dataListInput.current.value;
        let indx = str.indexOf("/");
        let rut= str.slice(0,indx-1);
        console.log(rut)
        //SE OBTIENE ROL DEL INPUTDATA
        let nameStart = str.indexOf('%');
        let rol= str.slice(indx+2 ,nameStart);
        console.log(rol)
        
        fetch(casesEndpoint + rut)
        .then(res => {return res.json()})
        .then(data => {
            let resp = data.resp;
            let chosenItem
            resp.forEach((item) => {
                (item.cases_rol_rit_ruc==rol)? chosenItem= item: console.log("")
                console.log(chosenItem)
                return chosenItem//SE OBITENE TODA LA INFORMACIÓN DE EL CASO SELECCIONADO, EN ESPECIAL EL ID DEL CASO
            });

            // SE INSERTAN DATOS DEL DOCUMENTO EN LA TABLA DOCUMENTS, CON ID DEL CASO
        const docsEndpoint = store.getState().fetchBase + "documentos/no_rol";; 
        const docData = {
                documents_type: document.getElementById('tipoDocumento').value,
                documents_cases_id: chosenItem.cases_id
            };
            
        // request options
        const docOptions = {
            method: 'POST',
            body: JSON.stringify(docData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(docsEndpoint, docOptions)
                .then(res => {return res.json()})
                .then(data => this.setState({documentLastRowInserted: JSON.stringify(data.resp)},
                ()=> {

                    //SE  ENVIA ARCHIVO AL BACKEND
        const pdf = this.PDFfile.current.files;
        const formData = new FormData();

        formData.append('pdf', pdf[0]);

        const docsEndpoint = store.getState().fetchBase + "documentos/upload/" + this.state.documentLastRowInserted;
        fetch(docsEndpoint,{

            method: "POST",
            body: formData
        })
        .then(res => {return res.json()})
        .then(data => {
            
            console.log(JSON.stringify(data.resp))
        });

                }
                ));

            });
    }

    copy(querySelector) {
    //DON'T WORK JS COPYCLIP BOARD ON REACT JS
      }

render(){
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                
                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 ">

                    <div  style={{backgroundColor: "#32D782", borderRadius: "10px", padding: "2%"}}>
                        <div className="h5" style={{color: "white",  fontWeight: "500", marginTop: "3%", textAlign: "center"}}>
                            -PLANILLA CAUSAS-


                            <div class="table-wrapper-scroll-y my-custom-scrollbar" style={{height: '90vh'}}>

                                <table class="table table-bordered table-striped mb-0">
                                    <thead >
                                    <tr>  
                                        <th scope="col" style={{color: 'white', backgroundColor: 'black'}}>CLIENTE</th>
                                        <th scope="col" style={{color: 'white', backgroundColor: 'black'}}>CASO</th>
                                        <th scope="col" style={{color: 'white', backgroundColor: 'black'}}>AVANCE</th> 
                                        <th scope="col" style={{color: 'white', backgroundColor: 'black'}}>PENDIENTE</th> 
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.dataList.map((item, index) => {
                                                                    return (
                                    <tr>
                                        
                                        <td style={{backgroundColor: "#CEF6D8"}}>{item.clients_name}</td>
                                        <td style={{backgroundColor: "#CEF6D8"}}>{item.cases_description}</td>
                                        <td style={{backgroundColor: "#CEF6D8"}}><button className="border-0" style={{backgroundColor: "#CEF6D8"}}>{item.cases_update}</button></td>
                                        <td style={{backgroundColor: "#CEF6D8"}}>{item.cases_pendingTask}</td>
                                                                         
                                    </tr>)})}
                                    
                                    </tbody>
                                </table>

                            </div>
                                  
                        </div>
                            
                    </div>
                </div>

                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 " style={{backgroundColor: "#32D782", borderRadius: "10px"}}>
                    <form>
                        <div className="h5" style={{color: "white",  fontWeight: "500", textAlign: "center"}}>-ANTECEDENTES CASO Y CLIENTE-</div>
                        <input style={{width: "100%", borderColor: "#4DF79F"}} id='1' ref={this.nombre} placeholder='  nombre'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='2' ref={this.rut} placeholder='  rut'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='3' ref={this.nacionalidad} placeholder='  nacionalidad'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='4' ref={this.estado_Civil} placeholder='  estado Civil'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='5' ref={this.profesion} placeholder='  profesión'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='6' ref={this.domicilio} placeholder='  domicilio'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='' ref={this.contacto} placeholder='  teléfono/m@il'/>

                
                        <div className="h5" style={{color: "white",  fontWeight: "500", textAlign: "center"}}></div>
                        <textarea style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='7' ref={this.descripcion}  placeholder='  descripcion' /><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='8' ref={this.juzgado_institucion} placeholder='  juzgado/institucion'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='9' ref={this.rol_rit_ruc} placeholder='  rol/rit/ruc'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='10' ref={this.materia} placeholder='  materia'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='11' ref={this.procedimiento} placeholder='  procedimiento'/><br />
                        <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='12' ref={this.objetivo} placeholder='  objetivo'/>
                        <input style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='crear_nuevo_cliente' type='button' value='NUEVO CLIENTE' onClick={this.postNewClient}/>

                    </form>
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action active text-center">
                            RECEPTORES CONFIANZA 
                        </a>
                        <div class="scrollmenu">
                            <a>FRANCISCO VARGAS HERRERA<br/><input  type="button" value="fvargash25@gmail.com" className="btn btn-success" onClick={()=>this.copy('FRANCISCO_VARGAS_HERRERA')}/><br/>9-79090562/SAN FELIPE</a>
                            <a>MARCELO BASCUÑAN BAROSSO<br/><input id="MARCELO BASCUÑAN BAROSSO" type="button" value="receptorbascunan@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>22-32249021/SANTIAGO</a>
                            <a>MYRIAM GONZALEZ JOFRE<br/><input id="MYRIAM GONZALEZ JOFRE" type="button" value="receptorcolina@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>9-93924548, 9-58776056/COLINA</a>
                            <a>GERARDO VERA MORALES<br/><input id="GERARDO VERA MORALES" type="button" value="gvera.receptor@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>22 932 0456/SAN MIGUEL</a>
                            <a>DANIEL MARCELO MORALES ALEGRIA<br/><input id="MARCELO MORALES ALEGRIA" type="button" value="danielmorales.receptor@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>22-8590024, 9-61425281/SAN BERNARDO</a>
                            <a>MARIA TERESA SOTO<br/><input id="MARIA TERESA SOTO" type="button" value="mtreceptor@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>SANTIAGO</a>  
                            <a>ALEJANDRO GUZMAN VALDIVIA<br/><input id="ALEJANDRO GUZMAN VALDIVIA" type="button" value="receptor.alejandroguzman@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>SANTIAGO</a>
                            <a>LUCIA OLIVAS RIOS<br/><input id="LUCIA OLIVAS RIOS" type="button" value="receptorcolina@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>9-58776056/COLINA</a>
                            <a>JUANA SANCHEZ G.<br/><input iJUANA SANCHEZ Gd="" type="button" value="juanasanchez.pj@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>9-92209813, 9-92497149/SANTIAGO</a>  
                            <a>LEONARDO OLGUIN PINO<br/><input id="LEONARDO OLGUIN PINO" type="button" value="leonardoolguin@gmail.com" className="btn btn-success" onClick={(e)=>{e.target.select()}}/><br/>22-6967081/SANTIAGO</a>                                                 
                        </div>                                          
                    </div>

                </div>

                <div className="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 ">
            
                    <div  style={{backgroundColor: "#32D782", borderRadius: "10px", padding: "2%"}}>
                    <div className="h5" style={{color: "white",  fontWeight: "500", marginTop: "3%", textAlign: "center"}}>-ACTUALIZACIÓN CAUSA-</div>
                        <input list="casos" id="dataListInput" style={{width: "100%", borderColor: "#4DF79F"}} ref={this.dataListInput}/>
                        <datalist id="casos" >
                        
                        {this.state.dataList.map((item, index) => {
                                return <option value={`${item.clients_rut} / ${item.cases_rol_rit_ruc}% ${item.clients_name}`} />
                            })
                        }

                        </datalist><br />
                        <textarea ref={this.ActualizacionAvanceCausa} className="mt-3" style={{width: "100%", borderColor: "#4DF79F"}} placeholder='  actualizar avance de la causa'/><br />
                        <textarea ref={this.ActualizacionTareaPendiente} className="mt-3" style={{width: "100%", borderColor: "#4DF79F"}} placeholder='  actualizar tarea pendiente'/><br />
                        <input ref={this.modificacion_rol_rit_ruc} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar rol/rit/ruc causa'/><br />
                        <input ref={this.modificacion_juzgado_institucion} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar Juzgado/Institución'/><br />
                        <textarea ref={this.modificacion_descripcion} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar descripcion caso'/><br />
                        <label className="checkbox-inline text-white font-weight-bold">Causa Terminada   <input ref={this.causa_teminada_checkBox} type="checkbox" style={{width: "20px", height: "20px"}}/></label>

                        <input  style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='actiualizar_causa' type='button' value='ACTUALIZAR CAUSA' onClick={this.updateCase}/>
                        
                    </div>

                    <div  style={{backgroundColor: "#32D782", borderRadius: "10px", padding: "2%"}}>
                        <form>
                            <input ref={this.PDFfile} type="file" accept=".pdf"/> 
                            <select id="tipoDocumento" ref={this.tipoDocumento} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  tipo documento'>
                                <option value="" style={{color: "gray"}}>-Tipo de Documento-</option>
                                <option value="Sentencia">Sentencia</option>
                                <option value="Avenimiento">Avenimiento</option>
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
                            </select><br />   
                            <input  onClick={this.docSubmit} value='GUARDAR DATOS'  type='button' style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}}/>
                        </form>
                    </div>
                    
                </div>
                
            </div>  
        </div>  
        </>
        
    );

}

}

