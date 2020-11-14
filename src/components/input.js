import React ,{ useState, useEffect, useRef} from 'react';
import {store} from '../redux/store.js';
import { useHistory } from "react-router-dom";


export default function Input(props){
    const ref = useRef(null);
    let history = useHistory();
    let userValue = props.userValue;

    const sendingToParentComponent = (e) =>{
        let value = ref.current.value;

        if(ref.current.dataset.customtype == "rut"){
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
    
        let inputValue= user
    
        fetch(store.getState().fetchBase + endpoint + inputValue )
        .then( (resp)=>{ return resp.json();})
        .then((data)=>{
    
            if(data.resp == ref){
                history.push("/rFgTdSvSVFgVFrtvvVgVSFvGDVDFVfgBfhGBgdVdFDVV");   
            }
        })
        .catch() 
    }

        return( 
           <>   
            <div className="input-group mb-3 p-relative">
                <div className="input-group-prepend">
                    <button onClick={()=> fetchQuery(userValue, props.endpoint, ref.current.value)} className="btn btn-outline-secondary" type="button" style={{display: props.displayBtn,backgroundColor: "#20be2b", color: "white", fontWeight: "200px", borderStyle: "none"}}>{props.btnLabel}</button>
                </div>
                <input onChange={sendingToParentComponent} ref={ref} placeholder={props.placeholder} type={props.type} className="form-control" data-customtype={props.customtype}  aria-label="" aria-describedby="basic-addon1"/>
                <small className="text-wrap font-weight-bold text-center pt-2" style={{margin: 'auto', color: "#569951", position: "absolute", top: "100%", visibility: "hidden"}}>{props.sorryMsg}</small>
            </div> 
           </> 

        );

}

/*readMe

#TO PASS A PROP OF THIS COMPONENT TO A PARENT COMPONENT YOU HAVE TO INSERT ON THE TAG THIS: parentCallback = {handleCallback}
AND ADD ON PARENT COMPONENT THIS FUNCTION:
 const handleCallback = (childData) =>{
                console.log(childData)
            }
*/