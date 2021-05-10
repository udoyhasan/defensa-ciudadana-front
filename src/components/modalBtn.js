import React from 'react';

export default function ModalBtn(props){
   

        return( 
           <>   
                <button key={`id1-${props.assignedkey}`} type="button" className="btn btn-primary m-2" data-toggle="modal" data-target={`#${props.target}`}>
                    {props.BtnTitle.toUpperCase()}
                </button>

                <div key={`id2-${props.assignedkey}`} className="modal fade" id={props.target} tabIndex="-1" role="dialog" aria-labelledby={props.target} aria-hidden="true">
                    <div key={`id3-${props.assignedkey}`} className="modal-dialog modal-dialog-centered" style={{maxWidth: (window.screen.width < 800)? '90%':'60%'}} role="document">
                        <div key={`id4-${props.assignedkey}`} className="modal-content">
                            <div key={`id5-${props.assignedkey}`}  style={{backgroundColor: "#32CB00"}}>
                                <h5 key={`id6-${props.assignedkey}`} className="modal-title text-center text-light justify-content-center p-3 font-weight-bold">{props.modalTitle.toUpperCase()}</h5>
                            </div>
                            <div key={`id7-${props.assignedkey}`} className="modal-body w-100">
                                {props.children}
                            </div>
                            <div key={`id8-${props.assignedkey}`} className="modal-footer" style={{backgroundColor: "#32CB00"}}>
                                <button key={`id9-${props.assignedkey}`} type="button" onClick={props.footerBtnOnClickFunction} data-dismiss="modal" className={`btn btn-secondary ${(props.insertBtn)?"":"d-none"}`}>{props.footerBtnTitle.toUpperCase()}</button>
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
*assignedkey: a key for React warning don't be showed



*/