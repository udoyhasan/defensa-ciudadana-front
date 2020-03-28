import React from 'react';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';



export default class NewClientForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {dataList:["a","b","c"]}

        this.postNewCaseAndClient=this.postNewCaseAndClient.bind(this);
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

postNewCaseAndClient()
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

componentDidMount(){
    let arr = [];
    fetch(store.getState().fetchBase + 'casos/"17.402.744-7"')//SE CARGA LOS DATOS DEL DATALIST
    .then(response => {return response.json();})
    .then(data => {
        
        
        arr.push(...data.resp)
 
        arr.map((item, index)=>{
            
            fetch(store.getState().fetchBase + `casos/detalle/${item[3]}/${item[2]}`)//SE CARGA LOS DATOS DEL DATALIST
            .then(response => {return response.json();})
            .then(data => {arr[index].push(data.resp[0][12]); //SE OBTIENE EL NOMBRE DEL CLIENTE EN EL CASO
                this.setState({dataList:arr});
                console.log(this.state)
        
        })

            
        })
    })
    
}

render(){
    return (
        <>
        <div className="row">
            <div className="col-md-4 mt-4"></div>

            <div className="col-md-4" style={{backgroundColor: "#32D782", borderRadius: "10px", marginTop: "2%"}}>
                <form>
                    <div className="h5" style={{color: "white",  fontWeight: "500", marginTop: "3%", textAlign: "center"}}>-ANTECEDENTES CLIENTE-</div>
                    <input style={{width: "100%", borderColor: "#4DF79F"}} id='1' ref={this.nombre} placeholder='  nombre'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='2' ref={this.rut} placeholder='  rut'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='3' ref={this.nacionalidad} placeholder='  nacionalidad'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='4' ref={this.estado_Civil} placeholder='  estado Civil'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='5' ref={this.profesion} placeholder='  profesión'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='6' ref={this.domicilio} placeholder='  domicilio'/><hr />
                    <div className="h5" style={{color: "white",  fontWeight: "500", textAlign: "center"}}>-ANTECEDENTES CASO-</div>
                    <textarea style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='7' ref={this.descripcion}  placeholder='  descripcion' /><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='8' ref={this.juzgado_institucion} placeholder='  juzgado/institucion'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='9' ref={this.rol_rit_ruc} placeholder='  rol/rit/ruc'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='10' ref={this.materia} placeholder='  materia'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='11' ref={this.procedimiento} placeholder='  procedimiento'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} id='12' ref={this.objetivo} placeholder='  objetivo'/>

                    <input style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='crear_nuevo_cliente' type='button' value='NUEVO CLIENTE' onClick={this.postNewCaseAndClient}/>
                </form>
                
            </div>
            <div className="col-md-4">
        
                <div className="mt-4" style={{backgroundColor: "#32D782", borderRadius: "10px", padding: "2%"}}>
                <div className="h5" style={{color: "white",  fontWeight: "500", marginTop: "3%", textAlign: "center"}}>-ACTUALIZACIÓN CAUSA-</div>
                    <input list="casos" style={{width: "100%", borderColor: "#4DF79F"}}/>
                    <datalist id="casos" >
                    {this.state.dataList.map((item, index)=>{
                            return <option key={index} value={`${item[4]}/${item[0]}/${item[1]}`} />
                    })}
                    </datalist><br />
                    <textarea className="mt-3" style={{width: "100%", borderColor: "#4DF79F"}} placeholder='  actualizar avance de la causa'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar rol/rit/ruc causa'/><br />
                    <input style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar Juzgado/Institución'/><br />
                    <textarea style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar descripcion caso'/><br />
                    <label class="checkbox-inline text-white font-weight-bold">Causa Terminada   <input type="checkbox" style={{width: "20px", height: "20px"}}/></label>
                    <input style={{width: "100%", marginTop:"3px",  marginBottom: "3%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='crear_nuevo_cliente' type='button' value='ACTUALIZAR CASO' />
                    
                </div>

                
            </div>
        </div>    
        </>
        
    );

}

}

