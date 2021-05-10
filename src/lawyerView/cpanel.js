import React from 'react';
import {store} from '../redux/store.js';
import 'tippy.js/dist/tippy.css';
import ModalBtn from '../components/modalBtn.js'
import Counter from '../components/counter.js';
import Statistic from '../components/statistic.js';
import FiltrableList from '../components/filtrableList.js';
import Multiselection from '../components/multiSelection';
import LottieContainer from '../components/lottieContainer.js';

export class Cpanel extends React.Component{
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
            statisticsTotalCases: 0,
            statisticsActiveCases: 0,
            statisticObj:[],
            showOldClientInputOnNewClientModal: "d-none"
        }
        

        //FUNCIONES ENLAZADAS CON CLASE DE COMPONENTE
        this.copy=this.copy.bind(this);
        this.NormaliceAccents=this.NormaliceAccents.bind(this);
        this.setAllRowOnGreen=this.setAllRowOnGreen.bind(this);
        this.createTicket = this.createTicket.bind(this);
        this.fetchingStatistics = this.fetchingStatistics.bind(this);

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
        
        this.left = React.createRef();
        this.middle = React.createRef();
        this.right = React.createRef();
        
        

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
        //Alert("¿estas seguro quieres salir?")

    }

    componentDidMount(){ 

        if(localStorage.getItem('lawyerData') === null){
            localStorage.setItem("lawyerData", JSON.stringify(store.getState().fetchedData));
        }

        this.fetchingStatistics();
    }

     fetchingActiveCases(){
         
        let incomingData = fetch(store.getState().fetchBase + 'casos/getAllActive')
        .then(response => {return response.json()})
        .then(data => {
            incomingData = data.resp;
            return incomingData      
        });

        return incomingData;
    }

    fetchingStatistics(){
        fetch('http://guillermopiedrabuena.pythonanywhere.com/statistics/1')
        .then(resp => {return resp.json()})
        .then((data)=>{
            
            this.setState({statisticsTotalCases: data.totalOfCases, statisticsActiveCases: data.activeCases,});
            
            // HERE WE RECIBE THE INCOME CASES DATA AND TRANSFORM IT TO PASS ON STATISTIC COMPONENT
            let incomeCasesmonthObj = {enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio:0,
            agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre:0}
            
            data.incomeCases.forEach((item)=>{   
                
                let index = item.cases_incomeDate.indexOf(",")
                let monthSubstring = item.cases_incomeDate.substring(index + 5, index + 8).toLowerCase()
                
                switch(monthSubstring){
                    case "jan":
                        incomeCasesmonthObj.enero = incomeCasesmonthObj.enero + 1
                        break;
                    case "feb":
                        incomeCasesmonthObj.febrero = incomeCasesmonthObj.febrero + 1
                        break;
                    case "mar":
                        incomeCasesmonthObj.marzo = incomeCasesmonthObj.marzo + 1  
                        break;  
                    case "apr":
                        incomeCasesmonthObj.abril = incomeCasesmonthObj.abril + 1
                        break;
                    case "may":
                        incomeCasesmonthObj.mayo = incomeCasesmonthObj.mayo + 1
                        break;
                    case "jun":
                        incomeCasesmonthObj.junio = incomeCasesmonthObj.junio + 1 
                        break;
                    case "jul":
                        incomeCasesmonthObj.julio = incomeCasesmonthObj.julio + 1
                        break;
                    case "aug":
                        incomeCasesmonthObj.agosto = incomeCasesmonthObj.agosto + 1
                        break;
                    case "sep":
                        incomeCasesmonthObj.septiembre = incomeCasesmonthObj.septiembre + 1
                        break;
                    case "oct":
                        incomeCasesmonthObj.octubre = incomeCasesmonthObj.octubre + 1
                        break;
                    case "nov":
                        incomeCasesmonthObj.noviembre = incomeCasesmonthObj.noviembre + 1
                        break;
                    case "dec":
                        incomeCasesmonthObj.diciembre = incomeCasesmonthObj.diciembre + 1
                        break; 
                    default:
                        break;
                }
            })

            //THE SAME BUT FOR THE CASES END DATE
            let deadLineCasesmonthObj = {enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio:0,
                agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre:0}
                
                data.finishedCases.forEach((item)=>{   
                    
                    let index = item.cases_deadLine.indexOf(",")
                    let monthSubstring = item.cases_deadLine.substring(index + 5, index + 8).toLowerCase()
                    
                    switch(monthSubstring){
                        case "jan":
                            deadLineCasesmonthObj.enero = deadLineCasesmonthObj.enero + 1
                            break;
                        case "feb":
                            deadLineCasesmonthObj.febrero = deadLineCasesmonthObj.febrero + 1
                            break;
                        case "mar":
                            deadLineCasesmonthObj.marzo = deadLineCasesmonthObj.marzo + 1  
                            break;  
                        case "apr":
                            deadLineCasesmonthObj.abril = deadLineCasesmonthObj.abril + 1
                            break;
                        case "may":
                            deadLineCasesmonthObj.mayo = deadLineCasesmonthObj.mayo + 1
                            break;
                        case "jun":
                            deadLineCasesmonthObj.junio = deadLineCasesmonthObj.junio + 1 
                            break;
                        case "jul":
                            deadLineCasesmonthObj.julio = deadLineCasesmonthObj.julio + 1
                            break;
                        case "aug":
                            deadLineCasesmonthObj.agosto = deadLineCasesmonthObj.agosto + 1
                            break;
                        case "sep":
                            deadLineCasesmonthObj.septiembre = deadLineCasesmonthObj.septiembre + 1
                            break;
                        case "oct":
                            deadLineCasesmonthObj.octubre = deadLineCasesmonthObj.octubre + 1
                            break;
                        case "nov":
                            deadLineCasesmonthObj.noviembre = deadLineCasesmonthObj.noviembre + 1
                            break;
                        case "dec":
                            deadLineCasesmonthObj.diciembre = deadLineCasesmonthObj.diciembre + 1
                            break; 
                    }
                })  

            //WE PREPARE THE OBJ TO THE STATISTICS COMPONENT ATTRIBUTE

            let statisticsComponentArray = [];
            let monthsOfTheYear = [{short:"ene", long: "enero"}, {short:"feb", long: "febrero"}, {short:"mar", long: "marzo"}, 
            {short:"abr", long: "abril"}, {short:"may", long: "mayo"}, {short:"jun", long: "junio"}, {short:"jul", long: "julio"},
            {short:"ago", long: "agosto"}, {short:"sep", long: "septiembre"}, {short:"oct", long: "octubre"}, {short:"nov", long: "noviembre"},
             {short:"dic", long: "diciembre"}]

                monthsOfTheYear.forEach((item)=>{
                    statisticsComponentArray.push({columnValue:[incomeCasesmonthObj[item.long], deadLineCasesmonthObj[item.long] ], columnLable:["in","out"] , columnGroupLabel: item.short})
            })

            //HERE WE STORE THE STATISTICS OF INCOME CASES
            let dateStaticObj = new Date();
            let currentMonth = dateStaticObj.getMonth();
            statisticsComponentArray = [...statisticsComponentArray.slice(currentMonth + 1, statisticsComponentArray.length), ...statisticsComponentArray.slice(0, currentMonth + 1)]
            this.setState({statisticObj: statisticsComponentArray})
            //console.log(statisticsComponentArray)
            
        })
        .catch(error=> console.log(error))



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

    setAllRowOnGreen(index){

       document.querySelectorAll(".selectionRow").forEach((item)=>{
            item.className = "selectionRow bg-no-selected text-dark"
        });
        document.getElementById(index.toString()).className = "selectionRow bg-selected text-dark";
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
                <div className="position-fixed h-100 turnHorizontalAdvisor" style={{zIndex: 5, visibility: "hidden"}}>
                    <LottieContainer backgroundColor="#1FBF2A" play={true} name="phone" lottie="11330-rotate-phone" additionalClassName="h-100 turnHorizontalAdvisor" width={window.innerWidth}/>   
                </div>
                <FiltrableList firstBtn={
                                    <ModalBtn assignedkey={1} insertBtn={true} BtnTitle="estadisticas" target="estatisticsModal" modalTitle="Esadísticas de tu cartera de clientes" footerBtnTitle="VOLVER">
                                    <div className="container-fluid">
                                        <div className="row h-100">
                                            <div className="col-3" />
                                            <div className="col-6">
                                                <Counter reverseObject={{counter: this.state.statisticsTotalCases, message: "Total de casos llevados"}} object={{counter: this.state.statisticsActiveCases, message: "Casos Activos"}} aditionalClassName=""/>
                                            </div>
                                            <div className="col-3" />
                                        </div>
                                    </div>
                                    <Statistic key="905435098" chartTitle="ingreso de causas mensual" id="casesData" data={this.state.statisticObj} />
                                </ModalBtn>
                                
                } 
                secondBtn={
                                <ModalBtn assignedkey={2} insertBtn={true} BtnTitle="NUEVO CLIENTE" target="tiketModal" modalTitle="Ingresa datos mínimos del caso" footerBtnTitle="Generar un Tiket" footerBtnOnClickFunction={this.createTicket}>
                                    <input ref={this.modalDescription} placeholder="Descripción " className="p-absolute m-2 p-2 text-left w-75 rounded border border-success"></input>
                                    <Multiselection placeholder="Materia" additionalClassName="w-75 p-absolute m-2 p-2 text-left" boundary="MultiselectionOnNewClient" options={["Civil","Familia", "Laboral", "Penal", "Administrativo", "Corporativo", "Propiedad Intelectual e Industrial" ]}  />
                                    <input ref={this.modalProcedure} placeholder="Procedimiento" className="p-absolute m-2 p-2 text-left w-75 rounded border border-success"></input>
                                    <input ref={this.modalObjetive} placeholder="Objetivo" className="p-absolute m-2 p-2 text-left w-75 rounded border border-success"></input>                                           
                                    <input ref={this.ticketBadge} onClick={this.copy} type="text" className="btn btn-primary ml-3 mb-3 mr-3 d-none" value={this.state.ticket} onChange={()=>{}}/>
                                    <div className="row">
                                    <div className="col-4 form-check form-switch">
                                        <input className="form-check-input" onChange={(e)=>{(e.target.checked)? this.setState({showOldClientInputOnNewClientModal: ""}):this.setState({showOldClientInputOnNewClientModal: "d-none"})}} type="checkbox" id="flexSwitchCheckDefault"/>
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">¿Cliente antiguo?</label>
                                    </div>
                                    <div className="col-8" style={{height: '80px'}}>
                                        <input /*ref={this.modalOldClient}*/ placeholder="00.000.000-0 " className={`p-absolute m-2 p-2 text-left w-50 rounded border border-success ${this.state.showOldClientInputOnNewClientModal}`}/>
                                    </div>
                                    </div>
                                </ModalBtn>


                } fetchingFunction={this.fetchingActiveCases} pendingTasksCounter={this.state.pendingTasksCounter} searchingResult={this.state.searchingResult} />
        
        </> 
        
    );

}
}

