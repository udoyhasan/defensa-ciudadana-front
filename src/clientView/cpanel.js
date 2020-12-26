import React from 'react';
import {store} from '../redux/store.js';
import lottie from 'lottie-web';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { Alert } from 'bootstrap';
import Counter from '../components/counter.js';
import Statistic from '../components/statistic.js';



export default class Cpanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            cases_client_id: "",
            documentLastRowInserted: "",
            startxTouch: 0,
            xTouch: 0,
            whereTo: "",
            panelArr: ["left", "middle", "right"],
            activeCol: 0,
            errorOrSucces: "11014-accepted",
            pendingTasksCounter: 0,
            ticket: "",
            searchingResult: 0,
            statisticsFetched: "",
            statisticObj:""//[{label: "junio", color:"green", data: 20}, {label: "julio", color:"red", data: 30}]
        }

        //FUNCIONES ENLAZADAS CON CLASE DE COMPONENTE
        this.postNewClient=this.postNewClient.bind(this);
        this.updateCase=this.updateCase.bind(this);
        this.docSubmit=this.docSubmit.bind(this); 
        this.copy=this.copy.bind(this);
        this.NormaliceAccents=this.NormaliceAccents.bind(this);
        this.startGesture=this.startGesture.bind(this);
        this.moveGesture=this.moveGesture.bind(this);
        this.endGesture=this.endGesture.bind(this);
        this.SetContentTippy=this.SetContentTippy.bind(this);
        this.updateOnlyCaseDate=this.updateOnlyCaseDate.bind(this);
        this.setAllRowOnGreen=this.setAllRowOnGreen.bind(this);
        this.caseSearcher=this.caseSearcher.bind(this);
        this.createTicket = this.createTicket.bind(this);

        

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
        this.one = React.createRef();
        this.two = React.createRef();
        this.three = React.createRef();
        this.four = React.createRef();
        this.five = React.createRef();
        this.six = React.createRef();
        this.seven = React.createRef();
        this.eight = React.createRef();
        this.nine = React.createRef();
        this.ten = React.createRef();
        this.modalDescription = React.createRef();
        this.modallegalIssue = React.createRef();
        this.modalProcedure = React.createRef();
        this.modalObjetive = React.createRef();
        this.ticketBadge = React.createRef();
        

        //REFERENCE OF THE CASES TABLE
        this.cPanelLoader = React.createRef();
        this.cPanelError = React.createRef();
        this.left = React.createRef();
        this.middle = React.createRef();
        this.right = React.createRef();
        this.casesTable = React.createRef();
        this.serachResult = React.createRef();

        //REFERENCES OF GESTURE INTERACTIVITY
        this.rightArrow = React.createRef();
        this.leftArrow = React.createRef();
        this.middleLeftArrow = React.createRef();
        this.middleRightArrow = React.createRef();
     


        //REFERENCIAS DE FORMULARIO ACTUALIZACION CAUSA
        this.dataListInput = React.createRef();
        this.ActualizacionAvanceCausa = React.createRef();
        this.ActualizacionTareaPendiente = React.createRef();
        this.modificacion_rol_rit_ruc = React.createRef();
        this.modificacion_juzgado_institucion = React.createRef();
        this.modificacion_descripcion = React.createRef();
        this.causa_teminada_checkBox = React.createRef(); 
        this.queryLoader = React.createRef(); 
        this.queryLoaderSucces = React.createRef(); 
        this.queryLoaderError = React.createRef(); 
        this.queryLoader2 = React.createRef(); 
        this.queryLoaderSucces2 = React.createRef(); 
        this.queryLoaderError2 = React.createRef(); 
        
        

        //REFERENCIAS DOCUMENTO CARGADO
        this.PDFfile = React.createRef();
        this.tipoDocumento = React.createRef();
    }

    componentWillUnmount(){
        Alert("¿estas seguro quieres salir?")

    }

    componentDidMount(){ 

        fetch('http://guillermopiedrabuena.pythonanywhere.com/statistics/1')
        .then(resp => {return resp.json()})
        .then((data)=>{
            
            this.setState({statisticsFetched: data});
            let incomeCasesArr = []
            let colors= ["DarkOrange","Aquamarine","orange","yellow","blue","pink","green","purple","gold","red","Cyan"]
            let months= ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre", "diciembre"]
            let incomeCases = data.incomeCases;
            

            incomeCases.forEach((item, index)=>{
                let obj = {label: months[index], color: colors[parseInt(Math.random()*10)], data: parseInt(item)};
                incomeCasesArr.push(obj);
            })
        this.setState({statisticObj: incomeCasesArr })

        })
        .catch(error=> console.log(error))

        document.addEventListener("touchstart", this.startGesture, false);
        document.addEventListener("touchmove", this.moveGesture, false);
        document.addEventListener("touchend", this.endGesture, false);
    
        let loaderlottieError =["11233-505-error", "3648-no-internet-connection"]
        let errorRandomLottie = Math.floor(Math.random()*2);

        tippy(this.ActualizacionAvanceCausa.current, {
            arrow: false,
            content: "<b id='tippyContent'>300</b>",
            trigger: 'mouseenter focus',
            allowHTML: true,
          });
          tippy(this.ActualizacionTareaPendiente.current, {
            arrow: false,
            content: "<b id='tippyContent2'>300</b>",
            trigger: 'mouseenter focus',
            allowHTML: true,
          });

        lottie.loadAnimation({
            container: this.leftArrow.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../assets/arrowAdvisor.json`)
          })  
          lottie.loadAnimation({
            container:  this.queryLoader.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../assets/query-loader.json`)
          })   
          lottie.loadAnimation({
            container:  this.queryLoader2.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../assets/query-loader.json`)
          })   
          lottie.loadAnimation({
            container: this.queryLoaderSucces.current,
            render: 'svg',
            loop: false,
            autoplay: true,
            animationData: require(`../assets/11014-accepted.json`)
          })      
          lottie.loadAnimation({
            container: this.queryLoaderSucces2.current,
            render: 'svg',
            loop: false,
            autoplay: true,
            animationData: require(`../assets/11014-accepted.json`)
          }) 
          lottie.loadAnimation({
            container: this.queryLoaderError.current,
            render: 'svg',
            loop: false,
            autoplay: true,
            animationData: require(`../assets/11015-error.json`)
          })   
          lottie.loadAnimation({
            container: this.queryLoaderError2.current,
            render: 'svg',
            loop: false,
            autoplay: true,
            animationData: require(`../assets/11015-error.json`)
          }) 
        lottie.loadAnimation({
            container: this.rightArrow.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../assets/arrowAdvisor.json`)
          })

        lottie.loadAnimation({
            container: this.cPanelLoader.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../assets/6615-loader-animation.json`)
          })
          lottie.loadAnimation({
            container: this.cPanelError.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../assets/${loaderlottieError[errorRandomLottie]}.json`)
          })
        fetch(store.getState().fetchBase + 'casos/getAllActive')//LOADING DATALIST DATA
        .then(response => {
            return response.json();})
        .then(data => {
            this.cPanelLoader.current.className += "invisible d-none"
            
            this.setState({dataList: data.resp}, ()=>{

                tippy('.UpdateCase', {// IT IS NECESARY THAT THE TIPPY JS COMES BEFOR THE DATA RENDERING
                    arrow: true,
                    content: "actualizar fecha",
                    trigger: 'mouseenter',
                    allowHTML: false,
                    placement: "top-end"
                  });

                let counter = [];// WE COUNT THE PENDING TASKS ON THE TABLE
                this.state.dataList.forEach((item)=>{
                    let task = item.cases_pendingTask;
                    if(task){ 
                        if(task.trim().length !== 0){
                            counter.push(1);
                        }
                    }

                })
                this.setState({pendingTasksCounter: counter.length });
            })
            
            })  
            .catch(()=> {
                
            //----------------- HERE ARE A LOOP TO ENSURE THAT THE REQUEST ARRIVE WELL, TRY 5 TIMES
            let fecthFails;
            for(let i=0; i<5; i++){
             let fecthFails= true;
             setTimeout( ()=>{
                  
                fetch(store.getState().fetchBase + 'casos/getAllActive')
                .then(response => { 
                    return response.json();})
                .then(data => {
                    this.cPanelLoader.current.className += "invisible d-none"
                    this.setState({dataList: data.resp})
                })
                .catch((error) =>{})

             },2000)
             if (!fecthFails) { break; }
            }
            if(fecthFails)
            {
                this.cPanelLoader.current.className = "invisible d-none"
                this.cPanelError.current.className = " border-0 d-inline "
            }
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
                    .then(data => {});
                            
                }
                
                )}); 
    }

    updateCase(){//FETCH WITH PUT METHOD TO UPDATE THE TABLE

        this.queryLoader.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 visible"

        const urlClients = store.getState().fetchBase +'casos/no_rut'//FETCH CON POST A CLIENTES

        //GETTING THE NAME OF INPUTDATA
        let str = this.dataListInput.current.value;
        let indx = str.indexOf("/");
        //let nombre= str.slice(0,indx-1);
        //GETTING ROL OF INPUTDATA
        let nameStart = str.indexOf('%');
        let rol= str.slice(indx+2 ,nameStart);

   

        const clientData = {
            selected: rol,
            cases_rol_rit_ruc: this.modificacion_rol_rit_ruc.current.value,
            cases_update: this.ActualizacionAvanceCausa.current.value,
            cases_pendingTask: this.ActualizacionTareaPendiente.current.value,
            cases_trial_entity: this.modificacion_juzgado_institucion.current.value,
            cases_description: this.modificacion_descripcion.current.value,
            cases_activeCase: (this.causa_teminada_checkBox.current.checked === false)?1: 0
    
            };

        // request options
        const options = {
            method: 'PUT',
            body: JSON.stringify(clientData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(urlClients, options) 
            .then(res => {
                
                return res.json()})
            .then(data => {

                fetch(store.getState().fetchBase + 'casos/getAllActive')//RELOAD THE DATA WITH UPDATE
                .then(response => {return response.json();})
                .then(data => { 
                    this.setState({dataList: data.resp})
                    this.queryLoader.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 invisible"
                    this.modificacion_rol_rit_ruc.current.value = "";
                    this.ActualizacionAvanceCausa.current.value = "";
                    //WE RELOAD THE PENDING TASK COUNTER
                    if((this.ActualizacionTareaPendiente.current.value).trim().length === 0){this.setState({pendingTasksCounter: this.state.pendingTasksCounter - 1})}
                    this.ActualizacionTareaPendiente.current.value = "";

                    this.modificacion_juzgado_institucion.current.value = "";
                    this.modificacion_descripcion.current.value = "";
                    this.causa_teminada_checkBox.current.checked = false;

                    this.queryLoader.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 invisible"
                    this.setState({errorOrSucces: "11014-accepted"}, ()=>
                    this.queryLoaderSucces.current.className = "loader col-md-2 col-sm-2 col-2 col-lg-2 visible")
                    setTimeout(()=> {this.queryLoaderSucces.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 invisible"}, 3000)

                    })
                .catch((error)=>{  
                    this.setState({errorOrSucces: "11015-error"}, ()=> {this.queryLoaderError.current.className = "loader col-md-2 col-sm-2 col-2 col-lg-2 visible"})
                    this.queryLoader.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 invisible";
                    setTimeout(()=> {this.queryLoaderError.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 invisible"}, 3000)

                })    
            })
            .catch((error)=>{ 
                this.setState({errorOrSucces: "11015-error"}, ()=> {this.queryLoaderError.current.className = "loader col-md-2 col-sm-2 col-2 col-lg-2 visible"})
                this.queryLoader.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 invisible";
                setTimeout(()=> {this.queryLoaderError.current.className = " col-md-2 col-sm-2 col-2 col-lg-2 invisible"}, 3000)

            })
   
    }

    docSubmit(){
        const casesEndpoint = store.getState().fetchBase + "casos/";//PRIMERO SE HACE GET A CASOS PARA TRAER TODOS LOS CASOS DEL CLIENTE
        this.queryLoader2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 visible"
        //SE OBTIENE RUT DEL INPUTDATA
        let str = this.dataListInput.current.value;
        let indx = str.indexOf("/");
        let rut= str.slice(0,indx-1);
        //SE OBTIENE ROL DEL INPUTDATA
        let nameStart = str.indexOf('%');
        let rol= str.slice(indx+2 ,nameStart);
        
        fetch(casesEndpoint + rut)
            .then(res => {return res.json()})
            .then(data => { 
                        let resp = data.resp;
                        let chosenItem
                        resp.forEach((item) => {
                            (item.cases_rol_rit_ruc===rol)? chosenItem = item: console.log("")
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
                            .then(data => { 
                                            this.setState({documentLastRowInserted: JSON.stringify(data.resp)},
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
                                                        this.queryLoader2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible"
                                                        this.setState({errorOrSucces: "11014-accepted"}, ()=>
                                                        this.queryLoaderSucces2.current.className = "loader ccol-md-1 col-sm-1 col-1 col-lg-1 visible")
                                                        setTimeout(()=> {this.queryLoaderSucces2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible"}, 3000)
                                                    })
                                                    .catch(error=> { 
                                                        this.setState({errorOrSucces: "11015-error"}, ()=> {this.queryLoaderError2.current.className = "loader col-md-1 col-sm-1 col-1 col-lg-1 visible"})
                                                        this.queryLoader2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible";
                                                        setTimeout(()=> {this.queryLoaderError2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible"}, 3000)

                                                    })

                                                }
                                            )
                                    })
                                    .catch(error=>{ 
                                        this.setState({errorOrSucces: "11015-error"}, ()=> {
                                        this.queryLoaderError2.current.className = "loader col-md-1 col-sm-1 col-1 col-lg-1 visible"})
                                        this.queryLoader2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible";
                                        setTimeout(()=> {this.queryLoaderError2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible"}, 3000)

                                    })

                })
            .catch(error=>{
                this.setState({errorOrSucces: "11015-error"}, ()=> {
                this.queryLoaderError2.current.className = "loader col-md-1 col-sm-1 col-1 col-lg-1 visible"})
                this.queryLoader2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible";
                setTimeout(()=> {this.queryLoaderError2.current.className = " col-md-1 col-sm-1 col-1 col-lg-1 invisible"}, 3000)


            })
    }

    copy = (ref) => {

        let reference= ref.toString()
        switch (reference){
            case "one":
                this.one.current.select();
                document.execCommand('copy');
                break;
            case "two":
                this.two.current.select();
                document.execCommand('copy');
                break;
            case "three":
                this.three.current.select();
                document.execCommand('copy');
                break;
            case "four":
                this.four.current.select();
                document.execCommand('copy');
                break;
            case "five":
                this.five.current.select();
                document.execCommand('copy');
                break;
            case "six":
                this.six.current.select();
                document.execCommand('copy');
                break;
            case "seven":
                this.seven.current.select();
                document.execCommand('copy');
                break;
            case "eight":
                this.eight.current.select();
                document.execCommand('copy');
                break;
            case "nine":
                this.nine.current.select();
                document.execCommand('copy');
                break;
            case "ten":
                this.ten.current.select();
                document.execCommand('copy');
                break;
            default:
                let target = ref.target; 
                target.select();
                document.execCommand('copy');

        }
      }

NormaliceAccents (str) {
        var map = {
            '-' : ' ',
            'a' : 'á|à|ã|â|À|Á|Ã|Â',
            'e' : 'é|è|ê|É|È|Ê',
            'i' : 'í|ì|î|Í|Ì|Î',
            'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c' : 'ç|Ç',
            'n' : 'ñ|Ñ'
        };
        
        for (var pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        };
    
        return str;
    };

    startGesture(e){
        this.setState({startxTouch: e.touches[0].clientX})
    }
    moveGesture(e){
        let x = e.touches[0].clientX; //GESTURE DETECTOR
        (this.state.xTouch<x)? this.setState({whereTo: "right"}): this.setState({whereTo: "left"})
  
        this.setState({xTouch: x})
       }
    
    endGesture(e){
        if(Math.abs(this.state.startxTouch-this.state.xTouch)>200){
            if(e.target.tagName !== "SELECT" && e.target.tagName !== "A" && e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON" && e.target.tagName !== "TEXTAREA" && e.target.type !== "button")
            {
                if(this.state.whereTo==="right"){
                    this.rightArrow.current.click();
                }
                else if(this.state.whereTo==="left"){
                    this.leftArrow.current.click();
                }
            }
        }
    }

    SetContentTippy(id, ref){
        if(document.getElementById(id)!= null){
        document.getElementById(id).innerHTML = 300- this[ref].current.value.length;
        }
        
    }

    updateOnlyCaseDate(e){

        let selectedCase = [];
        let targetEle = e.target;
        let childNodes = targetEle.parentNode.parentNode.childNodes;
        childNodes.forEach((item)=>{
            let falseCase;
            (item.className === "cases_rol_rit_ruc")? selectedCase.push(item.innerHTML):falseCase = ""
            
        })

        //let date = new Date();

        const clientData = {
            selected: selectedCase[0],
            cases_updateDate: "the back don't need a date, it do it itself",
    
            };

        // request options
        const options = {
            method: 'PUT',
            body: JSON.stringify(clientData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch("http://guillermopiedrabuena.pythonanywhere.com/casos/1", options) 
            .then(res => {
                
                return res.json()})
            .then(data => {
            const instance = tippy(targetEle, {
                arrow: true,
                content: "  fecha actualizada   ",
                trigger: 'click mouseenter',
                allowHTML: false,
                placement: "top-end"
              });
            
              instance.show();

            setTimeout(()=> instance.disable(),1000)
           
                    
                  
            })
            .catch((error)=>{ 

            }) 


    }
    setAllRowOnGreen(index){

       document.querySelectorAll(".selectionRow").forEach((item)=>{
            item.className = "selectionRow bg-no-selected text-dark"
        });
        document.getElementById(index.toString()).className = "selectionRow bg-selected text-dark";
    }

    caseSearcher(e){
        
        let searchedValue = e.target.value.toLowerCase();
        let childrens = this.casesTable.current.childNodes;
        let noFilteredItem = [];
        //BEFORE NEW SEARCH WE DISPLAY EVERY CHILDS
        childrens.forEach((item)=>{item.style.display = "table-row";})

        childrens.forEach((item)=>{

         let rowconten = item.dataset.rowconten.toLowerCase(); //WE GET THE PERSONALIZED ATTRIBUTE DATA-ROWCONTENT, TROUGHT DATASET METHOD
        
            if(searchedValue.length !== 0){
                    if(!rowconten.includes(searchedValue)){ //HIDDE
                        item.style.display = "none";
                    }
                    else{
                        noFilteredItem.push(1);
                    }
                }
        
        })
        if(noFilteredItem.length>0){
            this.setState({searchingResult: noFilteredItem.length }, ()=> {this.serachResult.current.className = "text-white font-weight-bold m-3 h5"})

        } else {this.setState({searchingResult: noFilteredItem.length }, ()=> {this.serachResult.current.className = "text-white font-weight-bold m-3 h5 d-none"})
    }


    }

    createTicket(){
        let today = new Date();
        let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

        let json= {
            cases_description: this.modalDescription.current.value,
            cases_rol_rit_ruc: "",
            cases_trial_entity: "",
            cases_legalIssue: this.modallegalIssue.current.value,
            cases_procedure: this.modalProcedure.current.value,
            cases_objetive: this.modalObjetive.current.value,
            cases_incomeDate: currentDate ,
            cases_update: currentDate,
            cases_lawyer_id: 1,
            cases_activeCase: 1
        }

        let options = {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {'Content-Type': 'application/json'}}

            fetch( "http://guillermopiedrabuena.pythonanywhere.com/createTicket",options) 
            .then(response => {return response.json();})
            .then(data => {
                let ticket = data.ticket;
                this.setState({ticket: `http://guillermopiedrabuena.pythonanywhere.com/ticket/${ticket}`}, ()=>{ 
                    this.ticketBadge.current.className = "btn btn-primary ml-5 mb-3 mr-5 h6 "
                })
                
            })
    }



render(){
    return (
        <>
    
        <div id="carousel1" className="carousel slide" data-ride="" data-interval="false" style={{height: "90vh"}}>
            <div className="carousel-inner">
            <div className="carousel-item active">
            <div  style={{backgroundColor: "#c7c7c7", borderRadius: "10px", padding: "2%"}}>
                        <div style={{color: "black",  textAlign: "center"}}>
                           <h5 style={{ fontWeight: "bold", letterSpacing: "10px", fontFamily: "Courier New"}}> <button type="button" className="btn btn-primary mr-5" data-toggle="modal" data-target="#exampleModalCenter">
                            ESTADÍSTICAS
                            </button>PLANILLA DE CASOS
                                ({this.state.dataList.length})</h5>
                            <div className="d-flex flex-row " style={{backgroundColor: "#32cb00"}}><button className="border-0 rounded text-white bg-primary justify-content-start m-2 font-weight-bold" data-toggle="modal" data-target="#exampleModal">CREAR TICKET</button><input onChange={this.caseSearcher} placeholder="Busca por cliente, materia o rol ... " className="p-absolute m-2 p-2 text-left w-75 rounded border border-success justify-content-center"></input><span ref={this.serachResult} className="text-white font-weight-bold m-3 h5 d-none">RESULTADO ({this.state.searchingResult})</span></div>
                                        {/*MODAL*/}
                                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                            <div className="modal-header" style={{backgroundColor: "#32CB00"}}>
                                                <h5 className="modal-title text-center text-light justify-content-center" id="exampleModalLabel">DATOS DEL CASO</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                              
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                            <input ref={this.modalDescription} placeholder="Descripción " className="p-absolute m-2 p-2 text-left w-75 rounded border border-success"></input>
                                            <input ref={this.modallegalIssue} placeholder="Materia" className="p-absolute m-2 p-2 text-left w-75 rounded border border-success"></input>
                                            <input ref={this.modalProcedure} placeholder="Procedimiento" className="p-absolute m-2 p-2 text-left w-75 rounded border border-success"></input>
                                            <input ref={this.modalObjetive} placeholder="Objetivo" className="p-absolute m-2 p-2 text-left w-75 rounded border border-success"></input>                                            </div>
                                            <input ref={this.ticketBadge} onClick={this.copy} type="text" className="btn btn-primary ml-3 mb-3 mr-3 d-none" value={this.state.ticket}/>
                                            <div className="modal-footer" style={{backgroundColor: "#32CB00"}}>
                                                <button type="button" onClick={this.createTicket} className="btn btn-secondary">OBTENER TICKET</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/*STATISTICS MODAL */}
                                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content">
                                                <div className="modal-body">
                                                    <Counter object={{counter: this.state.statisticsFetched.activeCases, message: "Casos Activos"}} />
                                                    <Counter object={{counter: this.state.statisticsFetched.totalOfCases, message: "Total de casos llevados"}} />
                                                    <Statistic arr={this.state.statisticObj} />
                                                </div>
                                                </div>
                                            </div>
                                        </div>



                            <div className="table-wrapper-scroll-y my-custom-scrollbar tableFixHead" style={{height: '90vh',backgroundColor: "#32cb00"}}>

                                <table className="table table-bordered table-striped mb-5" style={{backgroundColor: "#fafafa"}}>
                                    <thead>
                                    <tr style={{backgroundColor: "#32cb00", color:"white"}}>  
                                        <th style={{width: "20%"}} scope="col">CLIENTE</th>
                                        <th style={{width: "10%"}} scope="col">CASO</th>
                                        <th style={{width: "10%"}} scope="col">ROL</th>
                                        <th style={{width: "40%"}} scope="col">AVANCE</th> 
                                        <th style={{width: "20%"}} scope="col">PENDIENTE ({this.state.pendingTasksCounter})</th> 
                                    </tr>
                                    </thead>
                                    <tbody ref={this.casesTable}>
                                    
                                    {this.state.dataList.map((item, index) => {
                                                                    return (
                                    <tr data-rowconten={`${item.clients_name}/${item.cases_description}/${item.cases_rol_rit_ruc}`} key={index*1000} className="selectionRow bg-no-selected text-dark" id={index.toString()}>
                                        
                                        <td onClick={()=> this.setAllRowOnGreen(index)} style={{fontSize: "12px"}}>{item.clients_name}</td>
                                        <td onClick={()=> this.setAllRowOnGreen(index)}  style={{fontSize: "12px"}}>{item.cases_description}</td>
                                        <td onClick={()=> this.setAllRowOnGreen(index)} className="cases_rol_rit_ruc" style={{fontSize: "12px"}}>{item.cases_rol_rit_ruc}</td>
                                        <td><button onDoubleClick={(e)=> {this.updateOnlyCaseDate(e);}} className="UpdateCase border-0 text-dark btn" style={{backgroundColor: "transparent", fontSize: "12px"}}>{item.cases_update}</button></td>
                                        <td  style={{fontSize: "12px"}} className=" caseUpdate ">{item.cases_pendingTask}</td>
                                                                         
                                    </tr>)})}
                                    
                                    </tbody>
                                    
                                </table>

                            <div ref={this.cPanelLoader} className="border-0 w-10" style={{position: "absolute", left: "40%", top: "20%"}}></div>
                            <div ref={this.cPanelError} className="border-0 invisible d-none w-50 "></div>

                            </div>
                                  
                        </div>
                            
                    </div>
            </div>
            <div className="carousel-item">
            <div className={`m-0 col-12 cl-sm-12 col-md-12 col-lg-12 col-xl-12 `} ref={this.middle} style={{backgroundColor: "#32cb00", borderRadius: "10px"}}>

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
            <div className="list-group">
                <a className="list-group-item list-group-item-action active text-center">
                    RECEPTORES CONFIANZA 
                </a>
                <div className="scrollmenu">
                
                    <a>FRANCISCO VARGAS HERRERA<br/><textarea  style={{width: "1px", height: "1px"}} ref={this.one} defaultValue='fvargash25@gmail.com' /><input  type="button" value="fvargash25@gmail.com" className="btn btn-success" onClick={()=> this.copy("one")}/><br/>9-79090562/SAN FELIPE</a>
                    <a>MARCELO BASCUÑAN BAROSSO<br/><textarea style={{width: "1px", height: "1px"}} ref={this.two} defaultValue='receptorbascunan@gmail.com' /><input type="button" value="receptorbascunan@gmail.com" className="btn btn-success" onClick={()=> this.copy("two")}/><br/>22-32249021/SANTIAGO</a>
                    <a>MYRIAM GONZALEZ JOFRE<br/><textarea style={{width: "1px", height: "1px"}} ref={this.three} defaultValue="receptorcolina@gmail.com" /><input id="MYRIAM GONZALEZ JOFRE" type="button" value="receptorcolina@gmail.com" className="btn btn-success" onClick={()=> this.copy("three")}/><br/>9-93924548, 9-58776056/COLINA</a>
                    <a>GERARDO VERA MORALES<br/><textarea style={{width: "1px", height: "1px"}} ref={this.four} defaultValue="gvera.receptor@gmail.com" /><input id="GERARDO VERA MORALES" type="button" value="gvera.receptor@gmail.com" className="btn btn-success" onClick={()=> this.copy("four")}/><br/>22 932 0456/SAN MIGUEL</a>
                    <a>DANIEL MARCELO MORALES ALEGRIA<br/><textarea style={{width: "1px", height: "1px"}} ref={this.five} defaultValue="danielmorales.receptor@gmail.com" /><input id="MARCELO MORALES ALEGRIA" type="button" value="danielmorales.receptor@gmail.com" className="btn btn-success" onClick={()=> this.copy("five")}/><br/>22-8590024, 9-61425281/SAN BERNARDO</a>
                    <a>MARIA TERESA SOTO<br/><textarea style={{width: "1px", height: "1px"}} ref={this.six} defaultValue="mtreceptor@gmail.com" /><input id="MARIA TERESA SOTO" type="button" value="mtreceptor@gmail.com" className="btn btn-success" onClick={()=> this.copy("six")}/><br/>SANTIAGO</a>  
                    <a>ALEJANDRO GUZMAN VALDIVIA<br/><textarea style={{width: "1px", height: "1px"}} ref={this.seven} defaultValue="receptor.alejandroguzman@gmail.com" /><input id="ALEJANDRO GUZMAN VALDIVIA" type="button" value="receptor.alejandroguzman@gmail.com" className="btn btn-success" onClick={()=> this.copy("seven")}/><br/>SANTIAGO</a>
                    <a>LUCIA OLIVAS RIOS<br/><textarea style={{width: "1px", height: "1px"}} ref={this.eight} defaultValue="receptorcolina@gmail.com" /><input id="LUCIA OLIVAS RIOS" type="button" value="receptorcolina@gmail.com" className="btn btn-success" onClick={()=> this.copy("eight")}/><br/>9-58776056/COLINA</a>
                    <a>JUANA SANCHEZ G.<br/><textarea style={{width: "1px", height: "1px"}} ref={this.nine} defaultValue="juanasanchez.pj@gmail.com" /><input id="JUANA SANCHEZ G" type="button" value="juanasanchez.pj@gmail.com" className="btn btn-success" onClick={()=> this.copy("nine")}/><br/>9-92209813, 9-92497149/SANTIAGO</a>  
                    <a>LEONARDO OLGUIN PINO<br/><textarea style={{width: "1px", height: "1px"}} ref={this.ten} defaultValue="leonardoolguin@gmail.com" /><input id="LEONARDO OLGUIN PINO" type="button" value="leonardoolguin@gmail.com" className="btn btn-success" onClick={()=> this.copy("ten")}/><br/>22-6967081/SANTIAGO</a>                                                 
                </div>                                          
            </div>

            </div>

            </div>
            <div className="carousel-item">
            <div className="m-0 p-0 col-md-12 col-lg-12 col-xl-12 " ref={this.right}>
                        
                        <div className=" p-3 pb-0 pt-0 mb-0"  style={{backgroundColor: "#32cb00"}}>
                        <div className="h5" style={{color: "white",  fontWeight: "500", textAlign: "center"}}>-ACTUALIZACIÓN CAUSA-</div>
                            <input list="casos" id="dataListInput" style={{width: "100%", borderColor: "#4DF79F"}} ref={this.dataListInput}/>
                            <datalist id="casos" >
                            
                            {this.state.dataList.map((item, index) => {
                                    let normalizedName = this.NormaliceAccents(item.clients_name);
                                    return <option key={index} value={`${item.clients_rut} / ${item.cases_rol_rit_ruc}% ${normalizedName}`} />
                                })
                            }
    
                            </datalist><br />
                            <textarea onChange={()=> this.SetContentTippy("tippyContent", "ActualizacionAvanceCausa")} maxLength="300" ref={this.ActualizacionAvanceCausa} className="mt-3" style={{width: "100%", borderColor: "#4DF79F"}} placeholder='  actualizar avance de la causa'/><br />
                            
                            <textarea onChange={()=> this.SetContentTippy("tippyContent2", "ActualizacionTareaPendiente")} maxLength="300" ref={this.ActualizacionTareaPendiente} className="mt-3" style={{width: "100%", borderColor: "#4DF79F"}} placeholder='  actualizar tarea pendiente'/><br />
                            <input ref={this.modificacion_rol_rit_ruc} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar rol/rit/ruc causa'/><br />
                            <input ref={this.modificacion_juzgado_institucion} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar Juzgado/Institución'/><br />
                            <textarea ref={this.modificacion_descripcion} style={{width: "100%", marginTop:"3px", borderColor: "#4DF79F"}} placeholder='  modificar descripcion caso'/><br />
                            <label className="checkbox-inline text-white font-weight-bold" style={{ height: "10vh"}}>
                                 
                                <div className="row">
                                    <div className="col-md-3 col-sm-3 col-3 col-lg-3">CERRAR  <input ref={this.causa_teminada_checkBox} type="checkbox" style={{width: "20px", height: "20px"}}/></div>
                                    <div className=" col-md-3 col-sm-3 col-3 col-lg-3 invisible" ref={this.queryLoader} style={{height: "8vh"}}></div>
                                    <div className=" loader col-md-3 col-sm-3 col-3 col-lg-3 invisible" ref={this.queryLoaderSucces} style={{height: "8vh"}}></div>
                                    <div className=" loader col-md-3 col-sm-3 col-3 col-lg-3 invisible" ref={this.queryLoaderError} style={{height: "8vh"}}></div>
                                </div>
                            </label>
    
                            <input  style={{width: "100%", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}} id='actiualizar_causa' type='button' value='ACTUALIZAR CAUSA' onClick={this.updateCase}/>
                            
                        </div>
    
                        <div className="p-3 pt-0 mt-0" style={{backgroundColor: "#32cb00"}}>
                            <form>
                            <div className="row">
                                    <div className="col-12 col-sm-12 col-md-5 col-12 col-lg-5 d-inline"> <i className="fas fa-upload fa-lg text-light bg-primary w-100 d-inline rounded p-2"></i> <input className="d-inline" ref={this.PDFfile} id="file" type="file"accept=".pdf"/></div>
                                    <div className=" col-1 col-sm-1 col-md-1 col-1 col-lg-1 p-3 invisible" ref={this.queryLoader2} style={{height: "5vw", minHeight: "50px",  minWidth: "70px"}}></div>
                                    <div className=" loader col-1 col-md-1 col-sm-1 col-1 col-lg-1 p-3 invisible" ref={this.queryLoaderSucces2} style={{height: "5vw", minHeight: "50px",  minWidth: "70px"}}></div>
                                    <div className=" loader col-1 col-md-1 col-sm-1 col-1 col-lg-1 p-3 invisible" ref={this.queryLoaderError2} style={{height: "5vw", minHeight: "50px",  minWidth: "70px"}}></div>
                            </div>
                            <div className="row">
                                <select id="tipoDocumento" ref={this.tipoDocumento} style={{width: "100%", borderColor: "#4DF79F"}} placeholder='  tipo documento'>
                                    <option value="" style={{color: "gray"}}>-Tipo de Documento-</option>
                                    <option value="Sentencia">Sentencia</option>
                                    <option value="Avenimiento">Avenimiento</option>
                                    <option value="Conciliación">Conciliación</option>
                                    <option value="Contestación">Contestación</option>
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
                                    </select>
                                </div>
                                
                                    <input  onClick={this.docSubmit} value='GUARDAR DATOS' type='button' style={{width: "100%", marginTop:"3px", height: "50px", backgroundColor: "#6c757d", color: "white", fontWeight: "bold"}}/>
                                
                            </form>
                        </div>
                        
                    </div>
            </div>
            </div>
            
            {/* NEXT AND PREV */}
            <a ref={this.rightArrow} style={{height: "15%",width: "5vw",transform: "rotate(90deg)", top: "70vh", left: "0vw" , zIndex:5, position: "fixed"}} className="carousel-control-prev" href="#carousel1" role="button" data-slide="prev">
           
            </a>
            <a ref={this.leftArrow} style={{height: "15%",width: "5vw",transform: "rotate(-90deg)", top: "70vh", left: "95vw" , zIndex:5, position: "fixed" }} className="carousel-control-next" href="#carousel1" role="button" data-slide="next">
                
            </a>
            
        </div>
        
        </> 
        
    );

}

}

