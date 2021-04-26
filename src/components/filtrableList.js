import React from 'react';

export default function FiltrableList(props){

    
        return( 
           <>   
                 <div  style={{backgroundColor: "#c7c7c7", borderRadius: "10px", padding: "2%"}}> 
                       
                        <div style={{color: "black",  textAlign: "center"}}>
                            
                           <h5 style={{ fontWeight: "bold", letterSpacing: "10px", fontFamily: "Courier New"}}> 
                           PLANILLA DE CASOS ({this.state.dataList.length})
                           </h5>
                                
                            <div className="d-flex flex-row " style={{backgroundColor: "#32cb00"}}>
                                <input onChange={this.caseSearcher} placeholder="Busca por cliente, materia o rol ... " className="p-absolute m-2 p-2 text-left w-75 rounded border border-success justify-content-center"></input>
                                <span ref={this.serachResult} className="text-white font-weight-bold m-3 h5 d-none">({this.state.searchingResult})</span>
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
           </> 

        );

}

/*

readMe

#Props brief:


*/