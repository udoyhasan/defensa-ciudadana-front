import React from 'react';
import '../style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from '../redux/store.js';
import { connect } from 'react-redux';
import {injectFetchedData} from '../redux/dispatchers.js';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import {changeEndpoint} from '../redux/dispatchers.js';


export class ClientPanel extends React.Component {
  constructor(props){
  super(props)
  this.download = this.download.bind(this)
  this.DocsDownloadMapedDiv = React.createRef;
  this.state={cases_activeCase: "",
              cases_client_id: "",
              cases_client_name: "",
              cases_client_rut: store.getState().rutSaver,
              cases_deadLine: "",
              cases_description: "",
              cases_id: "",
              cases_incomeDate: "",
              cases_legalIssue: "",
              cases_objetive: "",
              cases_procedure: "",
              cases_rol_rit_ruc: "",
              cases_trial_entity: "",
              cases_update: "",
              cases_updateDate: "",
              documents_id_arr: [],
              documentDownloadInputTippyPassword: "",
              wholeClickedCase: "",
              documentsIdArr: []
              }

  //REFERENCIAS REACT
  this.documentListContainer = React.createRef(); 
  this.dfPass = React.createRef();

  }

  componentDidMount() {

        let fetchedDataResp = store.getState().fetchedData.resp;
        let nodeArr=[];
        let arrOfCaseIdAndClientID= [];

        changeEndpoint("clientes/")

        console.log(fetchedDataResp)

        fetchedDataResp.forEach(ele =>{

          let date = ele.cases_updateDate ;//SE TRANSFORMA A FECHA CORTA
          
          date = (date == null)? "": date.slice(date.indexOf(',')+1)
          console.log(date)
          // ENCUENTRA TERCER ESPACIO Y SACA HORAS Y MINUTOS
          let dateArr = date.split('')
          let thirdSpaceIndex= 0
          let iterator=0;
          dateArr.forEach((item, index)=>{
            if(item===' '){
              iterator++;
              if(iterator==4){
              thirdSpaceIndex= index;
              }
            }
          })
          date = date.slice(0, thirdSpaceIndex)

          ele.cases_rol_rit_ruc == store.getState().whatCaseWasClicked? this.setState({
            cases_activeCase: ele.cases_activeCase ,
            cases_client_id:  ele.cases_client_id,
            cases_deadLine: ele.cases_deadLine ,
            cases_description:  ele.cases_description,
            cases_id: ele.cases_id ,
            cases_incomeDate: ele.cases_incomeDate ,
            cases_legalIssue: ele.cases_legalIssue ,
            cases_objetive: ele.cases_objetive ,
            cases_procedure:  ele.cases_procedure,
            cases_rol_rit_ruc:  ele.cases_rol_rit_ruc,
            cases_trial_entity:  ele.cases_trial_entity,
            cases_update:  ele.cases_update,
            cases_updateDate: date
           }): console.log(" ")
          
        })

        //FETCH A cLIENTS, PARA OBTENER NOMBRE CLIENTE
        
        fetch(store.getState().fetchBase + store.getState().fetchEndPoint + this.state.cases_client_rut)
       .then(response => {return response.json();})
       .then(data => {
           this.setState({documentsIdArr: data});
          })
        //FETCH A DOCUMENTS PARA OBTENER DATOS DE LOS DOCUMENTOS ASOCIADOS AL ACASO
        changeEndpoint("documentos/")
        fetch(store.getState().fetchBase + store.getState().fetchEndPoint + store.getState().whatCaseWasClicked) 
        .then(response => {return response.json();})
        .then(data => {
          let sorteData= data.resp.sort((a,b)=>a.documents_cases_id-b.documents_cases_id);
          sorteData.forEach((item)=>{
            var node = document.createElement("A");    
            node.className = 'password list-group-item list-group-item-action border-5 border-gray text-center'
            node.style.cursor = "pointer"
            node.download = true
            node.dataset.iD = item.documents_cases_id
            node.addEventListener("click", this.download);
            var textnode = document.createTextNode(item.documents_type);        
            node.appendChild(textnode);                             
            this.documentListContainer.current.appendChild(node) 
          })
        })
      }

  download(e){
    fetch(store.getState().fetchBase + store.getState().fetchEndPoint + 'download' + '/3') 
    .then(response => {return response.blob();})//SE RECIBE EL PDF COMO BLOB
    .then(blob =>{
      let clciked = e.target
      let objUrl = URL.createObjectURL(blob)
      clciked.setAttribute("href", objUrl)
      clciked.download = `${clciked.innerText}.pdf`;
    })
       
  }

  render(){
    return (
      <> 
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 text-justify">
          
            <div className="jumbotron d-flex mb-0 pb-0 pt-3 mt-4 shadow-lg" style={{backgroundColor: "white", borderLeft: "100px solid #6c757d"}} >
            <h1 className="display-4"></h1><br />
            <div className="jumbotron w-100 pt-0 pb-0 pr-0 mr-0"  style={{backgroundColor: "white"}}>
              <h1 className="display-4 mb-0 text-left">{this.state.cases_description}</h1>
              <h6 className="text-left">{this.state.cases_client_name}</h6>
              <div className="jumbotron p-3 pr-0 mr-0 mt-3 d-flex w-100"  style={{backgroundColor: "white"}}>
    <div className="jumbotron p-0 pr-4 w-100"  style={{backgroundColor: "white"}}><p className="lead pr-5" style={{borderBottom: "2px solid rgb(3,104,10)"}}>AVANCE <span style={{fontSize: "10px"}}>{this.state.cases_updateDate}</span></p><span className="text-justify">{this.state.cases_update}</span></div>
                <div className="jumbotron p-0 w-50"  style={{backgroundColor: "white"}}><p className="lead" style={{borderBottom: "2px solid rgb(3,104,10)", }}>OBJETIVO</p><span style={{wordSpacing: "1px"}}>{this.state.cases_objetive}</span></div>
              </div>
              <div className="jumbotron p-0 w-100" style={{backgroundColor: "white"}}>
              <p className="lead text-left text-center" style={{borderBottom: "2px solid rgb(3,104,10)"}}>MI CAUSA</p>
              <div className="d-flex">
  <div className="jumbotron p-0 w-100 " style={{backgroundColor: "white"}}><span className="badge badge-success h-100 mr-2">{this.state.cases_rol_rit_ruc} / {this.state.cases_trial_entity}</span></div>
                <div className="jumbotron p-0 w-100 " style={{backgroundColor: "white"}}><span className="badge badge-success h-100">{this.state.cases_legalIssue} / {this.state.cases_procedure}</span></div>
              </div>
            </div>
            </div>
            
            <div className="jumbotron p-4 pt-5 d-flex w-50"  style={{backgroundColor: "white", marginTop: "10%"}}>
              <div className="list-group w-100" ref={this.documentListContainer} >
                <a href="#" ref={this.dfPass} className="password list-group-item list-group-item-action border-0 active" style={{backgroundColor: "rgb(31,191,42)"}}>
                DOCUMENTOS
                </a>
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

