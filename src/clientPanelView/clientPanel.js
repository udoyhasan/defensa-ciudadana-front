import React from 'react';
import '../style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from '../redux/store.js';
import { connect } from 'react-redux';
import {injectFetchedData} from '../redux/dispatchers.js';
import tippy from 'tippy.js';
import lottie from 'lottie-web';
import 'tippy.js/dist/tippy.css';
import {changeEndpoint} from '../redux/dispatchers.js';


export class ClientPanel extends React.Component {
  constructor(props){
  super(props)
  this.container = React.createRef();
  this.turnHorizontalAdvisor = React.createRef();
  this.fileJSON = React.createRef();
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
              documentsIdArr: [],
              documentsIdArr2: []
              }

  //REFERENCIAS REACT
  this.documentListContainer = React.createRef(); 
  this.dfPass = React.createRef();

  }

  componentDidMount() {
//LOTTIE FILES ANIMATIONS SETUP
    lottie.loadAnimation({
      container: this.container.current,
      render: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../assets/27268-bubbles.json')
  })
  lottie.loadAnimation({
    container: this.fileJSON.current,
    render: 'svg',
    loop: true,
    autoplay: true,
    animationData: require('../assets/file.json')
})

lottie.loadAnimation({
  container: this.turnHorizontalAdvisor.current,
  render: 'svg',
  loop: true,
  autoplay: true,
  animationData: require('../assets/11330-rotate-phone.json')
})


        let fetchedDataResp = store.getState().fetchedData.resp;

        changeEndpoint("clientes/")

        //console.log(fetchedDataResp)

        fetchedDataResp.forEach(ele =>{

          let date = ele.cases_updateDate ;//SE TRANSFORMA A FECHA CORTA
          
          date = (date == null)? localStorage.getItem("date"): date.slice(date.indexOf(',')+1)
          
          // ENCUENTRA TERCER ESPACIO Y SACA HORAS Y MINUTOS
          if(date!=null){
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
        }
          //FILL THE PANEL WITH DE CASE DATA
          if(ele.cases_rol_rit_ruc == store.getState().whatCaseWasClicked || store.getState().whatCaseWasClicked == ele.cases_id)
          {
            if(date!=null){
            localStorage.setItem("date", date.toString())
          }
            localStorage.setItem("savedEle", JSON.stringify(ele));
           
            
            //console.clear()
           } 
          
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



    let jsonSavedEle = JSON.parse(localStorage.getItem("savedEle"));
    this.setState({cases_updateDate: localStorage.getItem("date")})
    this.setState({
      cases_activeCase: jsonSavedEle.cases_activeCase ,
      cases_client_id:  jsonSavedEle.cases_client_id,
      cases_client_name: jsonSavedEle.clients_name,
      cases_deadLine: jsonSavedEle.cases_deadLine ,
      cases_description:  jsonSavedEle.cases_description,
      cases_id: jsonSavedEle.cases_id ,
      cases_incomeDate: jsonSavedEle.cases_incomeDate ,
      cases_legalIssue: jsonSavedEle.cases_legalIssue ,
      cases_objetive: jsonSavedEle.cases_objetive ,
      cases_procedure:  jsonSavedEle.cases_procedure,
      cases_rol_rit_ruc:  jsonSavedEle.cases_rol_rit_ruc,
      cases_trial_entity:  jsonSavedEle.cases_trial_entity,
      cases_update:  jsonSavedEle.cases_update,
     
        }) 
      }

  download(e){//ARREGLAR
    
    //SE OBTIENEN LOS ID DE LOS DOCUMENTOS
    fetch(store.getState().fetchBase + store.getState().fetchEndPoint + '/' + store.getState().whatCaseWasClicked)
    .then(response => {return response.json();})
    .then(data =>{
    let arr = []
    data.resp.forEach((item)=>{
      arr.push({documents_id: item.documents_id, documents_type: item.documents_type})
    })
    this.setState({documentsIdArr2: [...arr]},
      
      ()=>{ 
          //EN EL CALLBAKC SE RECORRE CADA ITEM DE documentsIdArr PARA DESCARGAR EL PDF EN ESPECÍFICO

          this.state.documentsIdArr2.forEach((item)=>{
            
            
              
              fetch(store.getState().fetchBase + store.getState().fetchEndPoint + 'download/' + item.documents_id) 
              .then(response => {return response.blob();})//SE RECIBE EL PDF COMO BLOB
              .then(blob =>{
                let clciked = e.target
                let objUrl = URL.createObjectURL(blob)
                if(item.documents_type == e.target.innerText){
                clciked.setAttribute("href", objUrl)
                clciked.download = `${clciked.innerText}.pdf`;}
                        })
           
        })}
     
      
      )    
    })       
  }

  componentWillUnmount() {

    injectFetchedData({resp:[]})
    changeEndpoint("casos/")
    console.clear()

    
  }

  render(){
    return (
      <> 
      <div  ref={this.turnHorizontalAdvisor} className='turnHorizontalAdvisor' style={{visibility: "hidden", width: '100vw', height: "100vh" ,zIndex: '3', position: 'absolute', backgroundColor: "#1FBF2A"}}></div>

      <div  ref={this.container} className='ml-5 bubbles-background' style={{width: '100%' ,zIndex: '1', position: 'absolute', bottom:'-10%', transform: 'rotate(90deg)'}}></div>
      <div className="container container-client-panel mt-2 client-panel" style={{backgroundColor: "white" ,zIndex: '2', position: 'relative'}}>
        <div className="row" style={{height: "90vh"}}>
          <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 rounded-left" style={{backgroundColor: "rgb(108, 117, 125)"}}>
          </div>
          <div className="col-8 col-sm-8 col-md-8 col-lg-9 col-xl-9 container-size" style={{height: "65vh"}}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pl-4 pt-2 pb-2">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                <h1 className="display-4 mb-0 text-left">{this.state.cases_description}</h1>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 "><h6 className="text-left">{this.state.cases_client_name}</h6></div>
            </div>
            <div className="row">           
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-inline-block ">
                   <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                     <p className="lead pr-5" style={{borderBottom: "2px solid rgb(3,104,10)"}}>
                       AVANCE <span style={{fontSize: "10px"}}>{this.state.cases_updateDate}</span>
                    </p>
                   </div>
                   <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 overflow-auto" style={{height: "30vh"}}>
                   <span className="text-justify">{this.state.cases_update}</span>
                   </div>
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-inline-block">
                   <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                     <p className="lead pr-5" style={{borderBottom: "2px solid rgb(3,104,10)"}}>
                       OBJETIVO
                    </p>
                   </div>
                   <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 overflow-auto" style={{height: "30vh"}}>
                   <span className="text-justify" style={{wordSpacing: "1px"}}>{this.state.cases_objetive}</span>
                   </div>
                  </div>
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center lead" style={{borderBottom: "2px solid rgb(3,104,10)"}}>MI CAUSA</div>
                </div>
                <div className="row" >
                   <div className="col-8 col-sm-8 col-md-6 col-lg-6 col-xl-6 text-right">
                   <span className="badge badge-success h-100 mr-2 text-right">
                     {this.state.cases_rol_rit_ruc} / {this.state.cases_trial_entity}
                   </span>
                   </div>
                    <div className="col-4 col-sm-4 col-md-6 col-lg-6 col-xl-6 text-left ">
                    <span className="badge badge-success h-100 ">
                      {this.state.cases_legalIssue} / {this.state.cases_procedure}
                      </span>
                    </div>
                </div>
            </div>

          </div>
          <div className="col-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 pt-5 pl-0 ml-0" style={{paddingRight:"10vh"}}>
            <div className="list-group w-100" ref={this.documentListContainer} >
              <a href="#" ref={this.dfPass} className="d-inline password list-group-item list-group-item-action border-0 active" style={{maxHeight: "15%",backgroundColor: "rgb(31,191,42)"}}>
                <div className='text-center'>
                   <b>DOCUMENTOS</b>
                </div>
              </a>
            </div>

          </div>
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

