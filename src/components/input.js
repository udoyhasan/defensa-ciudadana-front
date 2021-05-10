import React ,{ useRef, useState } from 'react';
import {store} from '../redux/store.js';
import { useHistory } from "react-router-dom";
import LottieContainer from './lottieContainer.js';
import {injectFetchedData} from '../redux/dispatchers.js';

export default function Input(props){
    const ref = useRef(null);
    let history = useHistory();
    let userValue = props.userValue;

    //HOOKS
    const [displayLoader, setDisplayLoader] = useState('none');
    const [displayError, setDisplayError] = useState('none');
    const [playErrorForFailureFetch, setPlayErrorForFailureFetch] = useState(false);
    const [loaderAnimation, setLoaderAnimation] = useState('inputComponentLoader');
    const [errorAnimation, setErrorAnimation] = useState('inputComponentErrorAnimation');
    const [emptyInputAdvisor, setEmptyInputAdvisor] = useState('');
    const [eyeIcon, setEyeIcon] = useState('fas fa-eye-slash ml-3 mt-3 p-0');

    const sendingToParentComponent = (e) =>{
        let value = ref.current.value;

        if(ref.current.dataset.customtype === "rut"){
            let falseCase;

            let split = value.split("");

            split.includes("-")? split.splice(split.indexOf("-"),1): falseCase= null;
            split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
            split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
            
            (split.length>=2)?split[split.length-1] = "-" + split[split.length-1]:falseCase= null;

            split.length >5 ? split[split.length-4] = "." + split[split.length-4]: falseCase= null;
            split.length >7 ? split[split.length-7] = "." + split[split.length-7]: falseCase= null;

            e.target.value = split.join("")
        }

        props.parentCallback(ref.current.value);
        e.preventDefault();
    }

    const fetchQuery = (user, endpoint, ref) => { 
       
        let inputValue = user;

        if(user.length===0){
            setEmptyInputAdvisor(" position-absolute emptyInputAdvisor")
            setTimeout(()=>setEmptyInputAdvisor(""), 600)
        } 
        else{
            if(props.includeLoader){
                setDisplayLoader('inline');
                setDisplayError('none');
                setPlayErrorForFailureFetch(false);
                console.log("line 60") //aca salio una vez por un error
            }
        
            fetch(store.getState().fetchBase + endpoint + inputValue )
            .then( (resp)=>{ return resp.json();})
            .then((base64EncodedData)=>{ 
                
                let decodedStringAtoB = atob(base64EncodedData.resp);
                

                if(decodedStringAtoB === ref){
                    injectFetchedData(JSON.stringify({password: decodedStringAtoB, lawyerUser: inputValue})) //WE STORE ON REDUX STATE THE LAWYER DATA, TO LATER STORE ON LOCALsTORAGE
                    history.push("/rFgTdSvSVFgVFrtvvVgVSFvGDVDFVfgBfhGBgdVdFDVV");   
                }
                else{
                    setDisplayLoader('none');
                    setDisplayError('inline');
                    setPlayErrorForFailureFetch(true);
                    console.log("line 77")

                }
            })
            .catch(()=>{

                for(let i = 0; i < 4; i++){
                    fetch(store.getState().fetchBase + endpoint + inputValue )//WE REPEATE THE FETCH, COS OUR BACKEND IS LIKE A PENNIS
                    .then( (resp)=>{ return resp.json()})
                    .then((base64EncodedData)=>{

                        let decodedStringAtoB = atob(base64EncodedData.resp);
                            
                        if(decodedStringAtoB === ref){

                            history.push("/rFgTdSvSVFgVFrtvvVgVSFvGDVDFVfgBfhGBgdVdFDVV");  
                            
                        }
                       /* else{
                            setDisplayLoader('none');
                            setDisplayError('inline');
                            setPlayErrorForFailureFetch(true);
                            console.log("line 100")
                        }*/
                    })
                    .catch(()=>{

                        if(props.includeLoader){
                            setDisplayLoader('none');
                            setDisplayError('inline');
                            setPlayErrorForFailureFetch(true);
                            console.log("line 109")
                        }
            
                        console.log("%c the fetch of input component failed", "color: red");
                    })
                }
        
                    
                })
            }         
        }

        return( 
           <div key={`InputKey1-${props.keyId}`} className="container m-3">   
                <div key={`InputKey2-${props.keyId}`} className="row">
                    <div key={`InputKey3-${props.keyId}`} className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0 ">
                        <button key={`InputKey4-${props.keyId}`} onClick={()=> fetchQuery(userValue, props.endpoint, ref.current.value)} className="btn btn-outline-secondary float-right" type="button" style={{display: props.displayBtn, backgroundColor: "#20be2b", color: "white", fontWeight: "10em", borderStyle: "none", borderTopRightRadius: '0%', borderBottomRightRadius: '0%'}}>{props.btnLabel}</button>
                    </div>
                    <div key={`InputKey5-${props.keyId}`} className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 p-0" ref={props.reference} >
                        <input key={`InputKey6-${props.keyId}`} onChange={sendingToParentComponent} ref={ref} placeholder={props.placeholder} type={(eyeIcon==="fas fa-eye ml-3 mt-3 p-0")?"text":props.type} className={`form-control float-left ${emptyInputAdvisor}`} data-customtype={props.customtype}  aria-label="" aria-describedby="basic-addon1"/>
                    </div>
                    <div key={`InputKey7-${props.keyId}`} className={`col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 p-0 ${(props.type==="password")?"":"d-none"}`}>
                        <i key={`InputKey8-${props.keyId}`} style={{cursor: "pointer"}} onClick={()=> {(eyeIcon==="fas fa-eye-slash ml-3 mt-3 p-0")?setEyeIcon("fas fa-eye ml-3 mt-3 p-0"):setEyeIcon("fas fa-eye-slash ml-3 mt-3 p-0")}} className={eyeIcon}></i>
                    </div>
                    <div key={`InputKey9-${props.keyId}`} className={`${(props.type==="password")?"col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 p-0":"col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0 m-0"} ${(props.includeLoader)?"":"d-none"}`}>
                        <LottieContainer name="loader" play={true} loop={true} lottie={loaderAnimation} width="1%" display={displayLoader}/>
                        <LottieContainer name="error" play={playErrorForFailureFetch} loop={false} lottie={errorAnimation} width="1%" display={displayError}/>
                        <small key={`InputKey10-${props.keyId}`} className="text-wrap font-weight-bold text-center pt-2" style={{margin: 'auto', color: "#569951", position: "absolute", top: "100%", visibility: "hidden"}}>{props.sorryMsg}</small>
                    </div>
                </div>
           </div> 

        );

}

/*readMe

#Props brief:

*btnLabel: determine the label on the button, if is displayed
*sorryMsg: the msg of failed fetch
*placeholder
*endpoint: the endPoint to fetch
*type: if the input of component is text, password or other
*customtype: you have to point out "rut" if you want to trigger an special method for ruts or chilean social id
*displayBtn: if you want a only input, point out "none", if you want with a fixed btn point out "inline".
*includeLoader: true if you need a loader, commonly with the fetch btn.
*reference: a React ref to pass. This goes to the parent element of the input html tag

#TO PASS A PROP OF THIS COMPONENT TO A PARENT COMPONENT YOU HAVE TO INSERT ON THE TAG THIS: parentCallback = {handleCallback}
AND ADD ON PARENT COMPONENT THIS FUNCTION:
 const handleCallback = (childData) =>{
                console.log(childData)
            }
*/