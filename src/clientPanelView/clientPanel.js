import React from 'react';
import '../style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from '../redux/store.js';
import { connect } from 'react-redux';
import {injectFetchedData} from '../redux/dispatchers.js';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';



//COMPONENTE
export class ClientPanel extends React.Component {
  constructor(props){
  super(props)
  this.DocsDownloadMapedDiv = React.createRef;
  this.state={case: "",
              client: "",
              update: "",
              objetive: "",
              rol: "",
              trial: "",
              subject: "",
              procedure: "",
              estadoCivil: "",
              nacionalidad: "",
              clientId: "",
              casoId: "",
              documents_id_arr: [],
              documentDownloadInputTippyPassword: ""
              }
  //REFERENCIAS REACT
  this.documentListContainer = React.createRef(); 
  this.dfPass = React.createRef();

  }

  componentDidMount() { 
        let fetchedDataResp = store.getState().fetchedData.resp;
        let nodeArr=[];
        
        let arrOfCaseIdAndClientID= [];
        fetchedDataResp.forEach(ele =>{(ele.includes(store.getState().whatCaseWasClicked)? arrOfCaseIdAndClientID.push(ele[2], ele[3]): console.log(""))})

        fetch(store.getState().fetchBase + "casos/detalle/" + `${arrOfCaseIdAndClientID[1]}/${arrOfCaseIdAndClientID[0]}`)
        .then(response => {return response.json();})
        .then(data => { 


        injectFetchedData(data);
        
        let date = store.getState().fetchedData.resp[0][12];//SE TRANSFORMA A FECHA CORTA
        date = date.slice(date.indexOf(',')+1)
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
   

        this.setState({
          case: store.getState().fetchedData.resp[0][1],
          client: store.getState().fetchedData.resp[0][14],
          update: store.getState().fetchedData.resp[0][7],
          updateDate: date,
          objetive: store.getState().fetchedData.resp[0][8],
          rol: store.getState().fetchedData.resp[0][2],
          trial: store.getState().fetchedData.resp[0][3],
          subject: store.getState().fetchedData.resp[0][4],
          procedure: store.getState().fetchedData.resp[0][5],
          estadoCivil: store.getState().fetchedData.resp[0][13],
          nacionalidad: store.getState().fetchedData.resp[0][12],
          clientId: store.getState().fetchedData.resp[0][6],
          casoId: store.getState().fetchedData.resp[0][0]
        });
        
      
        //SE OBTIENE LA LISTA DE DOCUMENTOS ASOCIADOS AL CASO
        let objUrl = null;
        fetch(store.getState().fetchBase + "getDocument_id_list/" + this.state.casoId)
        .then(response => {return response.json();})
        .then(data => {
                
            this.setState({documents_id_arr: data.resp.documents_list})//SE GUARDA LA LISTA DE DOCUMENTOS (PROVENIENTES DEL FETCH) EN EL STATE DEL COMPONENTE
           
            this.state.documents_id_arr.forEach((item)=>{
              fetch(store.getState().fetchBase + "getFiles/" + item[0])
              .then(response => {return response.blob();})//SE RECIBE EL PDF COMO BLOB
              .then(blob =>{

              objUrl = URL.createObjectURL(blob)

              let node = document.createElement("A"); 
              node.setAttribute("class", "list-group-item list-group-item-action") 

              let download = `${item[1]}.pdf`              

              let rutSaver = store.getState().rutSaver; // DFPASS
              let arrRutSaver = rutSaver.split('')
              let dfpass = arrRutSaver.slice(7 , 10)
              dfpass =dfpass.join('')              

              this.dfPass.current.addEventListener("mouseover", (e)=>{
                    
                setTimeout(()=>{
                  
                  let tipyExpanded = e.target.getAttribute("aria-expanded")
                    if(tipyExpanded){//SE DETECTA QUE EL TOOLTIP APARECIÓ

                      let elements = document.getElementsByClassName('tipy')

                          for (var i = 0; i < elements.length; i++) {
                           
                            let elementValue = elements[i].value;
                            
                            elements[i].addEventListener('keypress', function(e) {
                              
                              if(e.key=="Enter"){
                            
                                console.log(elementValue)
                                if(elementValue===dfpass){
                                  node.setAttribute("href", objUrl)
                                  node.download = `${item[1]}.pdf`;
                                }
                              }

                          });
                        }
                    
                    }
                },500)
                
                  
              })
              let textnode =  document.createTextNode(item[1]); 
              node.appendChild(textnode);              
              
              nodeArr.push({index: item[0], node: node})// SE ORDENAN LOS DOCUMENTOS DE ACUERDO AL ID (FECHA INGRESO)
              nodeArr.sort((a,b)=>a.index-b.index);
              nodeArr.forEach((item)=>{
                this.documentListContainer.current.appendChild(item.node);
              })

              

              tippy('.password', {
                content: `<input class="tipy" type="text" className="form-control" placeholder="INGRESA DFPASS"/>`,
                allowHTML: true,
                interactive: true,
                theme: 'tomato',
                placement: 'left',
                theme: ""/*color pero no se pone*/,
                trigger: 'mouseenter click',
                hideOnClick: false,
    
              });

              

              })
            })
        })

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
              <h1 className="display-4 mb-0 text-left">{this.state.subject.toUpperCase()}</h1>
              <h6 className="text-left">{this.state.client}</h6>
              <div className="jumbotron p-3 pr-0 mr-0 mt-3 d-flex w-100"  style={{backgroundColor: "white"}}>
    <div className="jumbotron p-0 pr-4 w-100"  style={{backgroundColor: "white"}}><p className="lead pr-5" style={{borderBottom: "2px solid rgb(3,104,10)"}}>AVANCE <span style={{fontSize: "10px"}}>{this.state.updateDate}</span></p><span className="text-justify">{this.state.update}</span></div>
                <div className="jumbotron p-0 w-50"  style={{backgroundColor: "white"}}><p className="lead" style={{borderBottom: "2px solid rgb(3,104,10)", }}>OBJETIVO</p><span style={{wordSpacing: "1px"}}>{this.state.objetive}</span></div>
              </div>
              <div className="jumbotron p-0 w-100" style={{backgroundColor: "white"}}>
              <p className="lead text-left text-center" style={{borderBottom: "2px solid rgb(3,104,10)"}}>MI CAUSA</p>
              <div className="d-flex">
  <div className="jumbotron p-0 w-100 " style={{backgroundColor: "white"}}><span className="badge badge-success h-100 mr-2">{this.state.rol} / {this.state.trial}</span></div>
                <div className="jumbotron p-0 w-100 " style={{backgroundColor: "white"}}><span className="badge badge-success h-100">{this.state.subject} / {this.state.procedure}</span></div>
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

