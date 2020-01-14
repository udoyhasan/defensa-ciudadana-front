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
          
            <div className="jumbotron d-flex mb-0 pb-0 pt-3 mt-4">
            <h1 className="display-4"></h1><br />
            <div className="jumbotron w-100 pt-0" style={{backgroundColor: "purple"}}>
              <h1 class="display-4">Caso</h1>
              <div className="jumbotron p-3 mt-3 d-flex w-100" style={{backgroundColor: "black"}}>
                <div className="jumbotron p-0 w-100" style={{backgroundColor: "green"}}><p className="lead">avance</p><code className=" pl-3 pr-3 text-justify">estado de situacion de avance en la causa</code></div>
                <div className="jumbotron p-0 w-50" style={{backgroundColor: "yellow"}}><p className="lead">objetivo</p><code>obtener el resultado del cliente</code></div>
              </div>
              <div className="jumbotron p-0 w-100" style={{backgroundColor: "orange"}}>
              <p className="lead text-left">Mi causa</p>
              <div className="d-flex">
                <div className="jumbotron p-0 w-100" style={{backgroundColor: "white"}}><code>MATERIA/PROCEDIMEINTO</code></div>
                <div className="jumbotron p-0 w-100" style={{backgroundColor: "green"}}><code>ROL CAUSA</code></div>
              </div>
            </div>
            </div>
            
            <div className="jumbotron p-4 pt-5 d-flex w-50" style={{backgroundColor: "red"}}>
              <div class="list-group w-100">
                <a href="#" class="list-group-item list-group-item-action active">
                documentos
                </a>
                <a href="#" class="list-group-item list-group-item-action">doc 1</a>
                <a href="#" class="list-group-item list-group-item-action">doc 2</a>
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

