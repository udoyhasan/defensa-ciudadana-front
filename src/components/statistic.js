import React ,{ useState, useRef} from 'react';

export default function Statistic(props){

        const [colors, setColors] = useState([{ bg:"border border-primary border-4", colorGroupLabel: "text-primary h-6", colorColumnLabel: "text-primary"} , { bg:"bg-success", colorGroupLabel: "text-success h-6", colorColumnLabel: "text-white"}, { bg:"bg-danger", colorGroupLabel: "text-danger h-6", colorColumnLabel: "text-white"}, { bg:"bg-warning", colorGroupLabel: "text-warning h-6", colorColumnLabel: "text-white"}, { bg:"bg-info", colorGroupLabel: "text-info h-6", colorColumnLabel: "text-white"}])
        const containerRef = useRef(null);

        return( 
           <>   
                <div ref = {containerRef} style={{transform: 'rotateX(180deg)'}} className="container p-5 border border-top-0 border-right-0 statistic-container">
                    <div className="row h3 mb-4" style={{display: "inline-block", transform: 'rotateX(-180deg)'}}>{props.chartTitle.toUpperCase()}</div>                   
                        <div className="row">
                        {
                            
                            props.data.map((item, index)=>{
                                let random = Math.floor(Math.random()*5)
                                let JSXArray = []
                                for (let i = 0; i < item.columnValue.length; i++) {
                                    JSXArray.push(
                                    <div className="col m-0 p-0 shineLikeDiamond" key={"id1-" + i.toString()}>       
                                        <div className={`${colors[random].bg}`} key={"id2-" + i.toString()} style={{height: item.columnValue[i]*10}}>
                                            <code className={colors[random].colorColumnLabel} key={"id3-" + i.toString()} style={{display: "inline-block", transform: 'rotateX(-180deg)'}}>
                                                {item.columnLable[i]}
                                            </code>
                                        </div>
                                        <code className="col text-dark font-weight-bold m-0 p-0" key={"id4-" + i.toString()} style={{display: "inline-block", transform: 'rotateX(-180deg)'}}>{(item.columnValue[i]>0)?item.columnValue[i]:" "}</code>
                                    </div>
                                    )
                                  }
                                return(
                                    <>
                                    <div className="col m-0 p-0" key={"id5-" + index.toString()}>
                                        <div className="m-1 p-0 row" key={"id6-" + index.toString()}>
                                          <code className={`w-100 col-12 ${colors[random].colorGroupLabel}`} key={"id7-" + index.toString()} style={{fontSize: "0.6em", display: "inline-block", transform: 'rotateX(-180deg)'}}>{item.columnGroupLabel.toUpperCase()}</code>
                                        </div>
                                        <div className="m-2 row" key={"id8-" + index.toString()}>
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
