import React ,{ useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {store} from '../redux/store.js';

import {JobsContainer} from './JobsContainer.js'
import {Button} from './button.js'

export function JobExchange(){

    const [jobs, setJobs] = useState([]);


    useEffect(() => {//SE DEBE HACER FETCH DE CASOS
        //setJobs([1,2])
      });

        return(
           <>   
           <JobsContainer className='d-flex flex-row h-100'>
           <h1 className='text-center mb-5'>BOLSA DE TRABAJO</h1>
           <div className="d-flex flex-row bd-highlight mt-5 mb-3 h-100">
                <div className="p-2 m-2 jumbotron w-50" style={{height: "29vh", overflowY: 'scroll'}}>
                    {jobs.map((item) => <Button key={item}>{item}</Button>)}
                </div>
                <div className="p-2 m-2 jumbotron w-50 h-100" style={{height: "100%", color: 'white', backgroundColor: '#20be2b'}}>
                    <h1>CLIENTE</h1>
                    <p className="lead">MATERIA: <span>civil</span></p>
                    <p className="lead">DESCRIPCIÓN: <span>obtener posesion efectiva</span></p>
                    <p className="lead">GANANCIA: <span>$200.000</span></p>
                </div>
            </div>

           </JobsContainer>
           </> 

        );

}