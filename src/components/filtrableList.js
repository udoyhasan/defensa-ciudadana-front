import React, { useEffect, useState, useRef} from 'react';
import {store} from '../redux/store.js';
import lottie from 'lottie-web';
import tippy, {followCursor} from 'tippy.js';
import LottieContainer from './lottieContainer.js';
import 'tippy.js/animations/scale.css';
import DropZone from './dropZone.js'
import Input from './input.js'
import Button from './button.js'

export default function FiltrableList(props){

    //REFS
    const searchResult = React.createRef();
    const casesTable = React.createRef();
    const cPanelLoader = React.createRef();
    const cPanelError = React.createRef();
    const filter = React.createRef();
    const MapedCasesRowsRefs = useRef([]);
    const MapedDocumentsRowsRefs = useRef([]);
    const docsAndUpdateModalBody = useRef(null);
    const docsAndUpdatesModalContainerRef = useRef(null);
    const updateCaseModalInputsRefs = useRef([]);

    //STATE
    const [searchingResult, setSearchingResult] = useState(0);
    const [noFilteredItem, setNoFilteredItem] = useState(0);
    const [incomingData, setIncomingData] = useState([]);
    const [a, b] = useState([]);
    const [filterArrangementType, setFilterArrangementType] = useState(["SIN FILTRO", "FILTRO POR URGENCIA", "FILTRO POR MATERIA", "FILTRO POR TRIBUNAL"]);
    const [selectedFilterArrangementType, setSelectedFilterArrangementType] = useState(0)
    const [whatIconWasClickedOnTippyModal, setWhatIconWasClickedOnTippyModal] = useState("")
    const [clickedCase, setClickedCase] = useState({})
    const [userInputValue, setUserInputValue] = useState("")
    const [documentsOfClickedCase, setDocumentsOfClickedCase] = useState([])
    const [displayLoader, setDisplayLoader] = useState('none');
    const [displayError, setDisplayError] = useState('none');
    const [playErrorForFailureFetch, setPlayErrorForFailureFetch] = useState(false);
    const [loaderAnimation, setLoaderAnimation] = useState('inputComponentLoader');
    const [errorAnimation, setErrorAnimation] = useState('inputComponentErrorAnimation');
    const [inputsPlaceholderArr, setInputsPlaceholderArr]= useState(["Actualizar avance de la causa","actualizar anotaciones","Actualizar el rol de la causa","Actualizar institución o Tribunal","Modifica la Materia del caso"]);
    const [widthScreen, setWidthScreen ] = useState(window.innerWidth/1000);
    const [initTimeCalculator, setInitTimeCalculator ] = useState(false);



    useEffect(()=>{ // A CONTINOUS USEEFFECT TO DETECT IF THE HTML OF DOCUMENTS AND UPDATE MODAL WAS CHANGED 
        let modalTitleInnerHTML;

        setInterval(()=>{
            modalTitleInnerHTML = document.getElementById('docs-update-modal-title').innerHTML;
            (modalTitleInnerHTML=== "DOCUMENTOS")?setWhatIconWasClickedOnTippyModal("DOCUMENTOS"):setWhatIconWasClickedOnTippyModal("ACTUALIZACION")
        },1000)
    })

    useEffect(()=>{ 
        console.log("funciona")
    },[initTimeCalculator])
    
    useEffect(()=>{ 
        
        //HERE IS EXECUTED THE PARENT FETCH FUNCTION
        
        setInterval(()=>{
            fetchingFunctionReciber() 
        },1000)
        
        tippyInit();
    },[])

    useEffect(()=>{   b([1,2,3]) //UNEXPLICABLY THIS SETSTATE TRIGGER FILTER
        // THIS USEEFFECT THROW US TO THE ANOTHER USEEFFECT ON LINE 90
        // WE MODIFY THE TIPPY LABEL CONTENT

        const instance = filter.current._tippy;
        instance.setContent(`<b id='tippyContent'>${filterArrangementType[selectedFilterArrangementType]}</b>`);

        let listToSort = incomingData;
        let result;
        let prueba = 666;
        
        if(filterArrangementType[selectedFilterArrangementType] === "FILTRO POR URGENCIA"){
            result = listToSort.sort((a,b)=>{
               return Date.parse(a.cases_updateDate) - Date.parse(b.cases_updateDate)
           })
        }
        else if(filterArrangementType[selectedFilterArrangementType] === "FILTRO POR MATERIA"){ 
            let subjectArrObj = {civilLaw: [], criminalLaw:[], Administrative:[], laborLaw: [], 
                familyLaw: [], IntelectualProperty: [], corporativeLaw: [], others: []}

            listToSort.forEach((item) => {
                switch(item.cases_legalIssue.toUpperCase()){
                    case "CIVIL":
                        subjectArrObj.civilLaw.push(item);
                        break;
                    case "PENAL":
                        subjectArrObj.criminalLaw.push(item);
                        break;
                    case "FAMILIA":
                        subjectArrObj.familyLaw.push(item);
                        break;
                    case "LABORAL":
                        subjectArrObj.laborLaw.push(item);
                        break;
                    case "ADMINISTRATIVO":
                        subjectArrObj.Administrative.push(item);
                        break;
                    case "PROPIEDAD INDUSTRIAL":
                        subjectArrObj.IntelectualProperty.push(item);
                        break;
                    case "CORPORATIVO":
                        subjectArrObj.corporativeLaw.push(item);
                        break;
                    default:
                        subjectArrObj.others.push(item);
                        break;
                }

                result = [...subjectArrObj.civilLaw, ...subjectArrObj.familyLaw, ...subjectArrObj.laborLaw, ...subjectArrObj.criminalLaw,
                        ...subjectArrObj.Administrative, ...subjectArrObj.others, ...subjectArrObj.corporativeLaw]
                });
        }
        else if(filterArrangementType[selectedFilterArrangementType] === "FILTRO POR TRIBUNAL"){
            
            let subjectArrObj = {civilLaw: [], criminalLaw:[], Administrative:[], laborLaw: [], 
                familyLaw: [], IntelectualProperty: [], corporativeLaw: [], others: []}

            listToSort.forEach((item) => { // WE ARRANGE THE CASES BY SUBJECT AND LATER ARRANGE BY TRIAL
                switch(item.cases_legalIssue.toUpperCase()){
                    case "CIVIL":
                        subjectArrObj.civilLaw.push(item);
                        break;
                    case "PENAL":
                        subjectArrObj.criminalLaw.push(item);
                        break;
                    case "FAMILIA":
                        subjectArrObj.familyLaw.push(item);
                        break;
                    case "LABORAL":
                        subjectArrObj.laborLaw.push(item);
                        break;
                    case "ADMINISTRATIVO":
                        subjectArrObj.Administrative.push(item);
                        break;
                    case "PROPIEDAD INDUSTRIAL":
                        subjectArrObj.IntelectualProperty.push(item);
                        break;
                    case "CORPORATIVO":
                        subjectArrObj.corporativeLaw.push(item);
                        break;
                    default:
                        subjectArrObj.others.push(item);
                        break;
                }
                
            }); 
            let propSorted= [];
            for(const prop in subjectArrObj){
                    let propContent = subjectArrObj[prop]
                    
                    let sortedProp = propContent.sort(function(a, b){
                        if(a.cases_trial_entity < b.cases_trial_entity) { return -1; }
                        if(a.cases_trial_entity > b.cases_trial_entity) { return 1; }
                        return 0;
                    })
                    propSorted.push(...sortedProp)
            }
            result = propSorted
        }
        else{
            result = listToSort.sort((a,b)=>{
                return Date.parse(a.cases_updateDate) - Date.parse(b.cases_updateDate)
            
            })
        }
       
       //WE STORE THE ARRANGED ARRAY RESULT
       setIncomingData(result);

    },[selectedFilterArrangementType])

    useEffect(()=>{ 
        setSearchingResult(props.searchingResult)
    },[props])

    useEffect(()=>{
        if(noFilteredItem.length>0){
            searchResult.current.className = "text-white font-weight-bold m-3 h5"

        }
        else{
            searchResult.current.className = "text-white font-weight-bold m-3 h5 d-none"
        }
    },[searchingResult])

    const tippyInit = () => { 

        tippy(filter.current, {
            content: `<b id='tippyContent'>${filterArrangementType[selectedFilterArrangementType]}</b>`,
            trigger: 'mouseenter focus',
            placement: "right",
            allowHTML: true
          });
    }

    const fetchingFunctionReciber = async()=>{
        props.fetchingFunction()
        .then((data)=>{
            let emptyArray=[]
            data.map((item)=>{
                emptyArray.push(item)
            })      
            setIncomingData(emptyArray)  
        })
    }

    const setAllRowOnGreen = (index) =>{ 

        document.querySelectorAll(".selectionRow").forEach((item)=>{
             item.className = "selectionRow bg-no-selected"
         });
         document.getElementById(index.toString()).className = "selectionRow bg-selected text-dark";

     }
    const lottieInit = () => {

        let loaderlottieError =["11233-505-error", "3648-no-internet-connection"]
        let errorRandomLottie = Math.floor(Math.random()*2);

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
    }

    const sortList = ()=> { 
        
        if(selectedFilterArrangementType === 3){
            setSelectedFilterArrangementType(1)
        }
        else{
        setSelectedFilterArrangementType(selectedFilterArrangementType + 1)
        }
    }

    const hoverTimeCalculator = () => {
        
       /* const timer = setInterval(()=>{
            setTimeCalculator(timeCalculator + 1)
            console.log(timeCalculator)
        }, 1000)*/
    }

    const killerHoverTimeCalculator = () => {
        //clearInterval(timer)
    }

    const rowOnHoverShowTippy = (index) =>{ // debes poner una funcion que mida el tiempo de hover

        tippy(MapedCasesRowsRefs.current[index], {
            content: `  
            <i class="fas fa-folder fa-2x p-2" data-toggle="modal" data-target="#docsAndUpdateModal" onclick="document.getElementById('docs-update-modal-title').innerHTML = 'DOCUMENTOS'"></i>
            <i class="fas fa-pen fa-2x p-2" data-toggle="modal" data-target="#docsAndUpdateModal" onclick="document.getElementById('docs-update-modal-title').innerHTML = 'ACTUALIZAR'"></i> 
            `,
            trigger: 'mouseenter',
            animation: 'scale',
            duration: [200,0],
            placement: "top",
            interactive: true,
            hideOnClick: false,
            plugins: [followCursor],
            followCursor: 'horizontal',
            allowHTML: true
            });

        //WE GET THE CASE CODE FOR FETCH TO BACKEND
        let rowContent = MapedCasesRowsRefs.current[index].dataset.rowcontent;
        let firstSlach = rowContent.indexOf('/');
        let secondSlash = rowContent.indexOf('/', firstSlach + 1);
        let ThirdSlash = rowContent.indexOf('/', secondSlash + 1);
        let client = rowContent.substring(0, firstSlach)
        let caseCode = rowContent.substring(secondSlash + 1, ThirdSlash); 
        let caseId = rowContent.substring(ThirdSlash + 1, rowContent.length);
        setClickedCase({caseCode: caseCode, caseId: caseId, client: client })
        

        //ALSO WE FETCH THE DOCS DATA, FOR A BETTER UI, AND STORE IN A USESTATE
        fetch(store.getState().fetchBase + 'documentos/' + caseCode) 
        .then( resp =>{ return resp.json()})
        .then( data =>{
            setDocumentsOfClickedCase(data.resp)
        })
        .catch(error => console.log(error))

    }

    const deleteDocument = (mappedItemObject, index) => {

        let currentRow = MapedDocumentsRowsRefs.current[index]
        
        let documentType = mappedItemObject.documents_type;
        let documentId = mappedItemObject.documents_id;
        let docsEndpoint = "/documentos/no_rol"
        

        const docData = {
            documents_type: documentType,
            documents_id: documentId
        };
                        
        // request options
        const docOptions = {
          method: 'DELETE',
          body: JSON.stringify(docData),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        
        fetch(store.getState().fetchBase + docsEndpoint, docOptions)
        .then(resp => {return resp.text()})
        .then(data => { 
            console.log(data)
            //WE DELETE THE ROW OF THE DELETED DOCUMENT
            currentRow.parentNode.removeChild(currentRow);
        })
        .catch(error=>{ 
            console.log(error)
        })
    }

    const caseSearcher = (e) =>{
        
        setNoFilteredItem(0);
        let resultArray = []
        let searchedValue = e.target.value.toLowerCase();
        let childrens = casesTable.current.childNodes;
        
        //BEFORE NEW SEARCH WE DISPLAY EVERY CHILDS
        childrens.forEach((item)=>{item.style.display = "table-row";})

        childrens.forEach((item)=>{

            let rowcontent = item.dataset.rowcontent.toLowerCase(); //WE GET THE PERSONALIZED ATTRIBUTE DATA-ROWCONTENT, TROUGHT DATASET METHOD
        
            if(searchedValue.length !== 0){
                if(!rowcontent.includes(searchedValue)){ //HIDDE IF THE CONTENT OF THE ROW ISN'T EQUAL TO THE VALUE SEARCHED
                    item.style.display = "none";
                }
                else if(rowcontent.includes(searchedValue)){
                    
                    resultArray.push(1)
                }
            }
        })
        setNoFilteredItem(resultArray.length)
    }

    const handleCallbackUserInput = (childData) =>{
        setUserInputValue(childData)
    }
        
    const updateCase = () => {
        setDisplayLoader('')
        let inputsValues =[];
        let inputs = updateCaseModalInputsRefs.current

        inputs.forEach((item)=>{
            
            let wantedInputValue = item.childNodes[0].value
            inputsValues.push(wantedInputValue)
        })

        const clientData = {
            selected: clickedCase.caseCode,
            cases_update: inputsValues[0] ,
            cases_pendingTask: inputsValues[1],
            cases_rol_rit_ruc: inputsValues[2],
            cases_trial_entity: inputsValues[3],
            cases_description: inputsValues[4]    
            };

        // request options
        const options = {
            method: 'PUT',
            body: JSON.stringify(clientData),
            headers: {
                'Content-Type': 'application/json'
            }
        }


        fetch(store.getState().fetchBase + 'casos/no_rut' , options) 
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch((error)=>{  

        })
   
    }
        return( 
           <>   
                 <div  style={{backgroundColor: "#c7c7c7", borderRadius: "10px", padding: "2%"}}> 
                        <div style={{color: "black",  textAlign: "center"}}>
                            
                           <h5 style={{ fontWeight: "bold", letterSpacing: "10px", fontFamily: "Courier New"}}> 
                           PLANILLA DE CASOS ({incomingData.length})
                           </h5>
                           
                            <div className="d-flex flex-row" style={{backgroundColor: "#32cb00"}}>
                                <div className="col-3">
                                    {props.firstBtn}
                                    {props.secondBtn}
                                </div>
                                <input onChange={caseSearcher} placeholder="Busca por cliente, materia o rol ... " className="col-7 p-absolute m-2 p-2 text-left w-75 rounded border border-success justify-content-center"></input>
                                <div className="col-1 pl-0 pt-3 pr-3 pb-3">
                                    <i onClick={sortList} ref={filter} className=" fas fa-sort-amount-up fa-lg" style={{cursor: "pointer", float: "left"}}></i>
                                </div>
                                <span ref={searchResult} className={`col-1 text-white font-weight-bold ml-0 p-0 text-center align-middle  ${(noFilteredItem==0)?"d-none":" "}`}>FILTRO({noFilteredItem})</span>
                            </div>
                            <div className="my-custom-scrollbar tableFixHead" id="tableContainer" style={{height: '90vh',backgroundColor: "#32cb00"}}>

                                <table className="table table-bordered table-striped mb-5" style={{backgroundColor: "#fafafa"}}>
                                    <thead>
                                    <tr style={{backgroundColor: "#32cb00", color:"white"}}>  
                                        <th style={{width: "20%"}} scope="col">CLIENTE</th>
                                        <th style={{width: "10%"}} scope="col">MATERIA</th>
                                        <th style={{width: "10%"}} scope="col">ROL</th>
                                        <th style={{width: "40%"}} scope="col">AVANCE</th> 
                                        <th style={{width: "20%"}} scope="col">ANOTACIONES ({props.pendingTasksCounter})</th> 
                                    </tr>
                                    </thead>
                                    <tbody ref={casesTable}>
                                    
                                    {incomingData.map((item, index) => { 
                                        //VARIABLES REQUIRED TO THE URGENCY COLOR FILTER
                                        let currentDate = Date.parse(new Date().toLocaleDateString());
                                        let itemDate = Date.parse(item.cases_updateDate);
                                        let aDayOnMiliseconds = 100000000;
                                        let dataIndex = index + 1;
                                        let defaultFontColor = (dataIndex%2 === 0)?"white":"#F2F2F2"
                                        let filterBackgroundColorFunction = (currentDate - aDayOnMiliseconds*3>itemDate && currentDate - aDayOnMiliseconds*4<itemDate)?"#F3CBCB":(currentDate - aDayOnMiliseconds*4>itemDate && currentDate - aDayOnMiliseconds*10<itemDate)?"#F76666":(currentDate - aDayOnMiliseconds*10>itemDate)?"#FF0000":defaultFontColor
                                        let filterFontColorFunction = (currentDate - aDayOnMiliseconds*3>itemDate && currentDate - aDayOnMiliseconds*4<itemDate)?"black":(currentDate - aDayOnMiliseconds*4>itemDate && currentDate - aDayOnMiliseconds*10<itemDate)?"white":(currentDate - aDayOnMiliseconds*10>itemDate)?"white":"black"
                                        
                                        // SEE IN THIS MAP FUNCTION A WISE METHOD TO CREATE DINAMIC REFS CALBACK, SEE ALSO THE LINE 17     
                                            return (
                                                    <tr ref={(ref) => (MapedCasesRowsRefs.current[index] = ref)} data-index={index + 1} data-rowcontent={`${item.clients_name}/${item.cases_description}/${item.cases_rol_rit_ruc}/${item.cases_id}`} key={index*1000} className="selectionRow bg-no-selected" style={{color: filterFontColorFunction, backgroundColor: filterBackgroundColorFunction}} id={index.toString()}>
                                                        
                                                        <td onClick={()=> setAllRowOnGreen(index)} style={{fontSize: "12px"  }}>
                                                        <div onMouseEnter={(e) => rowOnHoverShowTippy(index)} className="position-absolute w-100" style={{color: 'transparent', height: '8%', backgroundColor: 'transparent'}} >-</div>
                                                            {item.clients_name}
                                                        </td>
                                                        <td onClick={()=> setAllRowOnGreen(index)}  style={{fontSize: "12px" }}>{item.cases_description}</td>
                                                        <td onClick={()=> setAllRowOnGreen(index)} className="cases_rol_rit_ruc" style={{fontSize: "12px"}}>{item.cases_rol_rit_ruc}<br/>{item.cases_trial_entity}</td>
                                                        <td onClick={()=> setAllRowOnGreen(index)} className="UpdateCase" style={{fontSize: "12px"}}>{item.cases_update}</td>
                                                        <td onClick={()=> setAllRowOnGreen(index)} style={{fontSize: "12px" }} className=" caseUpdate ">{item.cases_pendingTask}</td>
                                                                                        
                                                    </tr>
                                                    )
                                            })
                                        }
                                    </tbody>
                                </table>
                            
                                <div ref={docsAndUpdatesModalContainerRef} className="modal fade" id="docsAndUpdateModal" tabIndex="-1" role="dialog" aria-labelledby="#docsAndUpdateModal" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" style={{maxWidth: '60%'}} role="document">
                                        <div className="modal-content">
                                            <div  style={{backgroundColor: "#32CB00"}}>
                                                <h5 ref={docsAndUpdateModalBody} id="docs-update-modal-title" className="modal-title text-center text-light justify-content-center p-3 font-weight-bold">ho</h5>
                                            </div>
                                            <div className="modal-body w-100">
                                                {
                                                
                                                  (whatIconWasClickedOnTippyModal === "DOCUMENTOS")?
                                                  <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">DOC</th>
                                                            <th scope="col">TIPO</th>
                                                            <th scope="col">ELIMINAR</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            

                                                          documentsOfClickedCase.map((item, index)=>{

                                                            return(

                                                                <tr key={`trId${index}`} ref={(ref) => (MapedDocumentsRowsRefs.current[index] = ref)}>
                                                                    <td key={`tdId1-${index}`}>
                                                                        <a href={store.getState().fetchBase + 'documentos/download/' + item.documents_id}>
                                                                            <i key={`fasPdfId${index}`} className="fas fa-file-pdf fa-3x"/>
                                                                        </a>
                                                                    </td>
                                                                    <td key={`tdId2-${index}`}>{item.documents_type}</td>
                                                                    <td key={`tdId3-${index}`}>
                                                                        <i key={`fasTrashId${index}`} onClick={()=> {deleteDocument(item, index)}} className="fas fa-trash fa-3x"/>
                                                                    </td>
                                                                </tr>
                                                            )

                                                          }) 
                                                        }
                                                        
                                                    </tbody>
                                                    <div className="mt-5 pl-5 pr-5">
                                                       <DropZone data={clickedCase}/>
                                                    </div>
                                                    </table>
                                                  :<>
                                                    <div className="container">
                                                        <div className="row">
                                                        <div className="col-2"/>
                                                            <div className="col-6">
                                                                <h6>
                                                                    <code className="badge-success p-2 badge-pill font-weight-bold" style={{fontSize: widthScreen*10}}>
                                                                        {clickedCase.client} {clickedCase.caseCode}
                                                                    </code>
                                                                </h6>
                                                            </div>
                                                            <div className="col-2">
                                                                <div style={{height: '30px'}} >
                                                                    <LottieContainer name="loader" play={true} loop={true} lottie={loaderAnimation} width="100%" display={displayLoader}/>
                                                                    <LottieContainer name="error" play={playErrorForFailureFetch} loop={false} lottie={errorAnimation} width="10%" display={displayError}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-2"/>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-2"></div>
                                                            <div className="col-8">
                                                                {
                                                                        inputsPlaceholderArr.map((item, index)=>{

                                                                            return <Input reference={(ref) => (updateCaseModalInputsRefs.current[index] = ref)} parentCallback={handleCallbackUserInput} placeholder={item} type="text" displayBtn="none" includeLoader={false} />
                                                                        })
                                                                }
                                                                <Button onClickFunction={updateCase} id="fetchingUpdateBtn" >ACTUALIZAR</Button>
                                                            </div>
                                                            <div className="col-2"></div>
                                                        </div>
                                                    </div>
                                                    </>
                                                }
                                            
                                            </div>
                                            <div className="modal-footer" style={{backgroundColor: "#32CB00"}}>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">VOVLER</button>                                            </div>
                                        </div>
                                    </div>
                                </div>

                            <div ref={cPanelLoader} className="border-0 w-10" style={{position: "absolute", left: "40%", top: "20%"}}></div>
                            <div ref={cPanelError} className="border-0 invisible d-none w-50 "></div>

                            </div>
                                  
                        </div>
                            
                    </div>              
           </> 

        );
}

/*

readMe

#Props brief:

*dataList: the array of data to pass on component
*fetchingFunction: the function passed from parent component, that will fetch the dataList
*firstBtn: a JSX element that you can insert on the left side of filtrableTable, commonly a btn
*secondBtn
*filerFunction

*/