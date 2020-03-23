import React from 'react';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';



export default class NewClientForm extends React.Component{
    constructor(props){
        super(props);
        this.fetch=this.fetch.bind(this);
        this.nombre = React.createRef();
        this.rut = React.createRef();
        this.nacionalidad = React.createRef();
        this.estado_Civil = React.createRef();
        this.profesion = React.createRef();
        this.domicilio = React.createRef();
        this.descripcion = React.createRef();
        this.juzgado_institucion = React.createRef();
        this.rol_rit_ruc = React.createRef();
        this.materia = React.createRef();
        this.procedimiento = React.createRef();
        this.objetivo = React.createRef();  

    }

fetch()
{

    const urlClients = store.getState().fetchBase +'clientes/new'
    //const urlCases = store.getState().fetchBase + 'casos/new'
    
    // post body data 
    const clientData = {
     nombre: this.nombre.current.value,
     rut: this.rut.current.value,
     nacionalidad: this.nacionalidad.current.value,
     estado_Civil: this.estado_Civil.current.value,
     profesion: this.profesion.current.value,
     domicilio: this.domicilio.current.value,
     descripcion: this.descripcion.current.value,
     juzgado_institucion: this.juzgado_institucion.current.value,
     rol_rit_ruc: this.rol_rit_ruc.current.value,
     materia: this.materia.current.value,
     procedimiento: this.procedimiento.current.value,
     objetivo: this.objetivo.current.value  
    };
    // request options
    const options = {
        method: 'POST',
        body: JSON.stringify(clientData),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // send POST request
    fetch(urlClients, options)
        .then(res => {return res.json()})
        .then(data => console.log(JSON.stringify(data)));  

    
   
      
}


render(){
    return (
        <>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4" style={{backgroundColor: "#32D782", borderRadius: "10px", marginTop: "2%"}}>
                <form>
                    <div className="h5" style={{color: "white",  fontWeight: "500", marginTop: "3%", textAlign: "center"}}>-DANOS TUS DATOS-</div>
                    <input style={{width: "100%", borderColor: "#4DF79F"}} id='1' ref={this.nombre} placeholder='  nombre'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='2' ref={this.rut} placeholder='  rut'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='3' ref={this.nacionalidad} placeholder='  nacionalidad'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='4' ref={this.estado_Civil} placeholder='  estado Civil'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='5' ref={this.profesion} placeholder='  profesión'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='6' ref={this.domicilio} placeholder='  domicilio'/><hr />
                    <div className="h5" style={{color: "white",  fontWeight: "500", textAlign: "center"}}>-CUENTANOS TU PROBLEMA-</div>
                    <textarea style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='7' ref={this.descripcion}  placeholder='  descripcion' /><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='8' ref={this.juzgado_institucion} placeholder='  juzgado/institucion'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='9' ref={this.rol_rit_ruc} placeholder='  rol/rit/ruc'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='10' ref={this.materia} placeholder='  materia'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='11' ref={this.procedimiento} placeholder='  procedimiento'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='12' ref={this.objetivo} placeholder='  objetivo'/>

                    <input style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='crear_nuevo_cliente' type='button' value='nuevo cliente' onClick={this.fetch}/>
                </form>
                
            </div>
            <div className="col-md-4"></div>
        </div>    
        </>
        
    );

}

}

