import React from 'react';

export default function ModalBtn(props){
   

        return( 
           <>   
                <button type="button" className="btn btn-primary m-2" data-toggle="modal" data-target={`#${props.target}`}>
                    {props.BtnTitle.toUpperCase()}
                </button>

                <div className="modal fade" id={props.target} tabIndex="-1" role="dialog" aria-labelledby={props.target} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{maxWidth: '60%'}} role="document">
                        <div className="modal-content">
                            <div  style={{backgroundColor: "#32CB00"}}>
                                <h5 className="modal-title text-center text-light justify-content-center p-3 font-weight-bold">{props.modalTitle.toUpperCase()}</h5>
                            </div>
                            <div className="modal-body w-100">
                                {props.children}
                            </div>
                            <div className="modal-footer" style={{backgroundColor: "#32CB00"}}>
                                <button type="button" onClick={props.footerBtnOnClickFunction} className={`btn btn-secondary ${(props.insertBtn)?"":"d-none"}`}>{props.footerBtnTitle.toUpperCase()}</button>
                            </div>
                        </div>
                    </div>
                </div>
           </> 

        );

}

/*

readMe

#Props brief:

*Wrap others components with this component to insert as childs
*BtnTitle: the title of the boton, pass always a string
*target: points out to the module div content, only determine a id name and the terget that will bound the btn with the modal
*modalTitle: the title on de body of modal
*footerBtnTitle: a optional btn title
*footerBtnOnClickFunction: the function triggered of the btn
*insertBtn: a boolean that determine if you want or not a footer btn


*/