import React from 'react';
import '../style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from '../redux/store.js';
import { connect } from 'react-redux';
import {Container} from '../components/container.js'



//COMPONENTE
export class ClientPanel extends React.Component {
  constructor(props){
  super(props)
  }
  render(){
    return (
      <> 
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 text-center">
          
            <div className="jumbotron d-flex mb-0 pb-0 pt-3 mt-4 shadow-lg" style={{backgroundColor: "white", borderLeft: "100px solid #6c757d"}} >
            <h1 className="display-4"></h1><br />
            <div className="jumbotron w-100 pt-0 pb-0"  style={{backgroundColor: "white"}}>
              <h1 class="display-4 mb-0">Caso</h1>
              <h6>Cliente</h6>
              <div className="jumbotron p-3 mt-3 d-flex w-100"  style={{backgroundColor: "white"}}>
                <div className="jumbotron p-0 w-100"  style={{backgroundColor: "white"}}><p className="lead pr-5" style={{borderBottom: "2px solid rgb(3,104,10)"}}>AVANCE</p><span className=" pl-3 pr-5 text-justify">estado de situacion de avance en la causa</span></div>
                <div className="jumbotron p-0 w-50"  style={{backgroundColor: "white"}}><p className="lead" style={{borderBottom: "2px solid rgb(3,104,10)"}}>OBJETIVO</p><span>obtener el resultado del cliente</span></div>
              </div>
              <div className="jumbotron p-0 w-100" style={{backgroundColor: "white"}}>
              <p className="lead text-left text-center" style={{borderBottom: "2px solid rgb(3,104,10)"}}>MI CAUSA</p>
              <div className="d-flex">
                <div className="jumbotron p-0 w-100 " style={{backgroundColor: "white"}}><span className="badge badge-success h-100">MATERIA/PROCEDIMEINTO</span></div>
                <div className="jumbotron p-0 w-100 " style={{backgroundColor: "white"}}><span className="badge badge-success h-100">ROL CAUSA/ TRIBUNAL</span></div>
              </div>
            </div>
            </div>
            
            <div className="jumbotron p-4 pt-5 d-flex w-50"  style={{backgroundColor: "white", marginTop: "10%"}}>
              <div class="list-group w-100">
                <a href="#" class="list-group-item list-group-item-action border-0 active" style={{backgroundColor: "rgb(31,191,42)"}}>
                documentos
                </a>
                <div style={{overflow: "auto"}}>
                <a href="#" class="list-group-item list-group-item-action">doc 1</a>
                <a href="#" class="list-group-item list-group-item-action">doc 2</a>
                <a href="#" class="list-group-item list-group-item-action">doc 1</a>
                <a href="#" class="list-group-item list-group-item-action">doc 2</a>
                <a href="#" class="list-group-item list-group-item-action">doc 1</a>
                <a href="#" class="list-group-item list-group-item-action">doc 2</a>
                <a href="#" class="list-group-item list-group-item-action">doc 1</a>
                <a href="#" class="list-group-item list-group-item-action">doc 2</a>
                <a href="#" class="list-group-item list-group-item-action">doc 1</a>
                <a href="#" class="list-group-item list-group-item-action">doc 2</a>
                </div>
              </div>
            </div>
            </div>


          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      
      </>
    );
  }
}

function mapStateToProps(ClientPanel){

  return {  }

}

export default connect(mapStateToProps)(ClientPanel);

