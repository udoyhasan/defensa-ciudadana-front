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
    const urlCases = store.getState().fetchBase + 'casos/new'
    //SE HACE FETCH A LA TABLA CLIENTES
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

    //SE HACE FETCH A LA TABLA CASOS
    // post body data 
   /* const caseData = {
        descripcion: this.descripcion.current.value,
        juzgado_institucion: this.juzgado_institucion.current.value,
        rol_rit_ruc: this.rol_rit_ruc.current.value,
        materia: this.materia.current.value,
        procedimiento: this.procedimiento.current.value,
        objetivo: this.objetivo.current.value
       };
       // request options
       const options2 = {
           method: 'POST',
           body: JSON.stringify(caseData),
           headers: {
               'Content-Type': 'application/json'
           }
       }
       // send POST request
       fetch(urlCases, options2)
           .then(res => {return res.json()})
           .then(data => console.log(JSON.stringify(data)));  */
   
      
}


render(){
    return (
        <>
        <div style={{flexDirection: 'row'}}>
            <div style={{flex:1}}></div>
            <div style={{flex:1}}>
                <form>
                    <div>CLIENTE</div>
                    <input id='1' ref={this.nombre} placeholder='nombre'/><br />
                    <input id='2' ref={this.rut} placeholder='rut'/><br />
                    <input id='3' ref={this.nacionalidad} placeholder='nacionalidad'/><br />
                    <input id='4' ref={this.estado_Civil} placeholder='estado Civil'/><br />
                    <input id='5' ref={this.profesion} placeholder='profesión'/><br />
                    <input id='6' ref={this.domicilio} placeholder='domicilio'/><hr />
                    <div>CASO</div>
                    <textarea id='7' ref={this.descripcion}  placeholder='descripcion' /><br />
                    <input id='8' ref={this.juzgado_institucion} placeholder='juzgado/institucion'/><br />
                    <input id='9' ref={this.rol_rit_ruc} placeholder='rol/rit/ruc'/><br />
                    <input id='10' ref={this.materia} placeholder='materia'/><br />
                    <input id='11' ref={this.procedimiento} placeholder='procedimiento'/><br />
                    <input id='12' ref={this.objetivo} placeholder='objetivo'/><hr />

                    <input id='crear_nuevo_cliente' type='button' value='nuevo cliente' onClick={this.fetch}/><hr />
                </form>
                
            </div>
            <div style={{flex:1}}></div>
        </div>    
        </>
        
    );

}

}

