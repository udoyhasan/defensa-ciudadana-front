import { data } from 'jquery';
import React ,{ useState, useEffect, useRef} from 'react';
import { Col } from 'react-bootstrap';


export default function Statistic(props){
    const ref = useRef(null);

    useEffect(()=>{ console.log()
        
        let dataArr= (props.arr===undefined)?[{label: "junio", color:"green", data: 20}]:props.arr; // EXAMPLE: [{label: "junio", color:"green", data: 20}, {label: "julio", color:"red", data: 30}]
        let iterator = (props.arr===undefined)? 1: props.arr.length ;
       
        let total = 0;
        const xx =()=>{dataArr.forEach((item)=>{
            total = total + item.data
        })}

        let savedCardinalNumbersFromItemDataBeforePorcentageTransformation = [];
        const yy = () => {dataArr.forEach((item)=>{
            let itemDataInPorcentage = parseInt((item.data*100)/total)/100;
            savedCardinalNumbersFromItemDataBeforePorcentageTransformation.push(item.data)
            item.data = itemDataInPorcentage
        })}       

        console.log(JSON.stringify(savedCardinalNumbersFromItemDataBeforePorcentageTransformation))

        for(let i = 0; i < iterator; i++){

            let item = dataArr[i]
            
            var canvas = document.createElement("CANVAS");
            canvas.style.transform = "rotateX(180deg)"
            let context = canvas.getContext("2d");
            context.beginPath();
            context.fillStyle= item.color;
            context.fillRect(0, 0, 300/iterator, 150*item.data );
            context.stroke();

            var label = document.createElement("SPAM");
            label.classList.add("text-center");
            label.classList.add("d-block");
            label.innerHTML = `${item.label} (${savedCardinalNumbersFromItemDataBeforePorcentageTransformation[i]})`;
            

            var col = document.createElement("DIV");
            col.classList.add("col-" + (12/iterator).toString());
            col.classList.add("border-0");
            
            col.appendChild(canvas);
            col.appendChild(label); 
        
            ref.current.appendChild(col); 
        }
            
        },[props.arr])

        return( 
           <>   
                <div  className="container p-2 border border-top-0 border-right-0">
                    <div ref={ref} className="row">

                    </div>
                </div>
           </> 

        );

}
