import React ,{ useState, useEffect} from 'react';
import {store} from '../redux/store.js';

import {JobsContainer} from './JobsContainer.js'
import {Button} from './button.js'

export function JobExchange(){

    const [jobsList, setJobs] = useState([]);
    const [selectedJobState, setSelectedJob] = useState(0);
    const [displayedJob, setDisplayedJob] = useState({clients_name: " ", cases_legalIssue: " ", cases_description: " "});


    useEffect(()=>{
            fetch( store.getState().fetchBase + 'casosDisponibles') 
            .then(response => {return response.json();})
            .then(data => {
                
                setJobs([...data.resp])
                
            })}, []
      );

      useEffect(()=>{

        if(selectedJobState!=0){
            
            jobsList.forEach((item)=>{
                //console.log("item.cases_id: " + item.cases_id)
                //console.log("selectedJobHook: " + selectedJobHook)
                if(item.cases_id==selectedJobState){
                    setDisplayedJob({...item})
                    
                }

        })
      }
       
    },[selectedJobState]
  );

     
    
      const clickedJob = (e) =>{
        
        
        setSelectedJob(e.target.id);//THE CASE ID
        //HAY QUE HACER POST QUE CAMBIE EL CASES_LAWYER_ID
        

      }


        return(
           <>   
           <JobsContainer className='d-flex flex-row h-100'>
           <h1 className='text-center mb-5' >BOLSA DE TRABAJO</h1>
           <div className="d-flex flex-row bd-highlight mt-5 mb-3 h-100">
                <div className="p-2 m-2 jumbotron w-50" style={{height: "29vh", overflowY: 'scroll'}}>
                {jobsList.map((item) => {
                    if(item.cases_lawyer_id!=1){
                        return <Button click={clickedJob} id={item.cases_id} key={item.cases_id}>{item.cases_description}</Button>
                    }
                })}
                </div>
                <div className="p-2 pl-4 m-2 jumbotron w-50 h-100" style={{height: "100%", color: 'white', backgroundColor: '#20be2b'}}>
            <h4 style={{minHeight: '5vh'}}>{displayedJob.clients_name.toUpperCase()}</h4>
            <p className="lead">MATERIA: <span>{displayedJob.cases_legalIssue}</span></p>
            <p className="lead">DESCRIPCIÓN: <span>{displayedJob.cases_description}</span></p>
                    <p className="lead">GANANCIA: <span>$200.000</span></p>
                </div>
            </div>

           </JobsContainer>
           </> 

        );

}