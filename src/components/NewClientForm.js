import React from 'react';
import {panelBtnChanger} from '../redux/dispatchers.js';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';



export default class NewClientForm extends React.Component{
    constructor(props){
        super(props);
        this.fetch=this.fetch.bind(this);

    }

fetch(){
    //TODOS LOS VALUE DE LOS INPUT SE ALMACENAN EN ARRAY
    let arr=[];
    for(let i=1;i<14; i++){
    arr.push(`"${document.getElementById(i.toString()).value.toString()}"`);
    }
    
    let x = '"amaa"'
    console.log(arr[6])
    fetch(store.getState().fetchBase + 'casos/new/'+ arr[6] + '/' + arr[7] + '/' + arr[8] + '/' + 2 + '/' + arr[9] +  '/' + arr[10] + '/' + arr[11], {method: 'POST'})
       .then(response => { console.log("ok")})
       .then(data => {console.log("ok")})
       

}

render(){
    return (
        <>
        <div style={{flexDirection: "row"}}>
            <div style={{flex:1}}></div>
            <div style={{flex:1}}>
                <form>
                    <div>CLIENTE</div>
                    <input id="1" placeholder="nombre"/><br />
                    <input id="2" placeholder="rut"/><br />
                    <input id="3" placeholder="nacionalidad"/><br />
                    <input id="4" placeholder="estado Civil"/><br />
                    <input id="5" placeholder="profesión"/><br />
                    <input id="6" placeholder="domicilio"/><hr />
                    <div>CASO</div>
                    <textarea id="7"  placeholder="descripcion" /><br />
                    <input id="8" placeholder="juzgado/institucion"/><br />
                    <input id="9" placeholder="rol/rit/ruc"/><br />
                    <input id="10" placeholder="materia"/><br />
                    <input id="11" placeholder="procedimiento"/><br />
                    <input id="12" placeholder="objetivo"/><hr />

                    <input id="13" type="button" value="nuevo cliente" onClick={this.fetch}/><hr />
                </form>
            </div>
            <div style={{flex:1}}></div>
        </div>    
        </>
        
    );

}

}

