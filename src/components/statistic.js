import { data } from 'jquery';
import React ,{ useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom'


export default function Statistic(props){

        const [colors, setColors] = useState([{ bg:"border border-primary border-4", color: "text-primary h-6"} , { bg:"bg-secondary", color: "text-secondary h-6"}, { bg:"bg-success", color: "text-success h-6"}, { bg:"bg-danger", color: "text-danger h-6"}, { bg:"bg-warning", color: "text-warning h-6"}, { bg:"bg-info", color: "text-info h-6"}, { bg:"border border-success", color: "text-success h-6"}, { bg:"bg-dark", color: "text-dark h-6"}])
        const [chartHeight, setChartHeight] = useState(0)
        const [x, setx] = useState(document.querySelector(".statistic-container"))
        let refs = []
        const containerRef = useRef(null);

        return( 
           <>   
                <div ref = {containerRef} style={{transform: 'rotateX(180deg)'}} className="container p-2 border border-top-0 border-right-0 statistic-container">
                    <div className="row h3 mb-4" style={{display: "inline-block", transform: 'rotateX(-180deg)'}}>{props.chartTitle.toUpperCase()}</div>                   
                        <div className="row">
                        {
                            
                            props.data.map((item)=>{
                                let random = Math.floor(Math.random()*8)
                                let JSXArray = []
                                for (let i = 0; i < item.columnValue.length; i++) {
                                    JSXArray.push(
                                    <div className="col m-0 p-0">       
                                        <div className={`${colors[random].bg}`} style={{height: item.columnValue[i]*10}}>
                                            <code className="text-white" style={{display: "inline-block", transform: 'rotateX(-180deg)'}}>
                                                {item.columnLable[i]}
                                            </code>
                                        </div>
                                        <code className="col text-dark font-weight-bold" style={{display: "inline-block", transform: 'rotateX(-180deg)'}}>{item.columnValue[i]}</code>
                                    </div>
                                    )
                                  }
                                return(
                                    <>
                                    <div className="col">
                                        <div className="m-2 row">
                                          <code className={`w-100 col-12 ${colors[random].color}`} style={{fontSize: "0.6em", display: "inline-block", transform: 'rotateX(-180deg)'}}>{item.columnGroupLabel.toUpperCase()}</code>
                                        </div>
                                        <div className="m-2 row">
                                            {JSXArray}
                                        </div>
                                    </div>
                                    </>
                                    
                                )   

                            }                            
                        )}

                    </div>
                </div>
           </> 

        );

}

/*

readMe

#Props brief:

*id
*chartTitle
*data: You have to pas an array of js objects
Each item of the array have to had this keys:
    -columnValue
    -columnLabel: the specific label of uno group column
    -columnGroupLabel: the general label of the group 

    example of attribute => data={[{columnValue:[5, 10], columnLable:["nuevos","terminados"] , columnGroupLabel: "enero"}, {columnValue:[5,8], columnLable:["nuevos","terminados"], columnGroupLabel: "febrero"}]}

*/
