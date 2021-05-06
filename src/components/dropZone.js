import React, { useEffect, useRef, useState}  from 'react';
import {store} from '../redux/store.js';
import lottie from 'lottie-web';
import tippy from 'tippy.js';
import 'tippy.js/animations/scale.css';
import Button from './button.js';
import MultiSelection from './multiSelection.js'



export default function DropZone(props){

    //REFS
    const dragAndDrop = useRef(null); 
    const pdfFile = useRef(null);  
    
    //USEEFFECT
    const [clickedCase, setClickedCase] = useState({})
    const [documentLastRowInsertedId, setDocumentLastRowInsertedId] = useState(0)   
    const [preventOnFirstRender, setPreventOnFirstRender] = useState(true)   


    useEffect(()=>{
      setClickedCase(props.data)    
  },[props])

    useEffect(()=>{ 
    //WE PREVENT EXECUTE ON FIRST RENDER WITH THIS CONDITIONAL
    if(!preventOnFirstRender){

    //WE SEND THE FILE TO THE BACKEND
          const pdf = pdfFile.current.files;
          const formData = new FormData();
          formData.append('pdf', pdf[0]);
          const docsEndpoint = store.getState().fetchBase + "documentos/upload/" + documentLastRowInsertedId;
          
          fetch(docsEndpoint,{
            method: "POST",
            body: formData
            })
          .then(res => {return res.text()})
          .then(data => { 

            dragAndDrop.current.removeChild(dragAndDrop.current.children[1]);
    
            lottie.loadAnimation({
              container: dragAndDrop.current,
              render: 'svg',
              loop: false,
              autoplay: true,
              animationData: require(`../assets/11014-accepted.json`)
            })  

            setTimeout(()=>{
                dragAndDrop.current.removeChild(dragAndDrop.current.children[1]);
    
                const lottieInstance = lottie.loadAnimation({
                  container: dragAndDrop.current,
                  render: 'svg',
                  loop: true,
                  autoplay: true,
                  animationData: require(`../assets/drag-animation.json`)
                })  
            }, 5000)
          
          })
          .catch(error=> { 

            
            dragAndDrop.current.removeChild(dragAndDrop.current.children[1]);
    
            const lottieInstance = lottie.loadAnimation({
              container: dragAndDrop.current,
              render: 'svg',
              loop: false,
              autoplay: true,
              animationData: require(`../assets/11015-error.json`)
            })  

            setTimeout(()=>{
                dragAndDrop.current.removeChild(dragAndDrop.current.children[1]);
    
                const lottieInstance = lottie.loadAnimation({
                  container: dragAndDrop.current,
                  render: 'svg',
                  loop: true,
                  autoplay: true,
                  animationData: require(`../assets/drag-animation.json`)
                })  
            }, 5000)


          })
      }
    },[documentLastRowInsertedId])

    useEffect(()=>{

        
        const lottieInstance = lottie.loadAnimation({
          container: dragAndDrop.current,
          render: 'svg',
          loop: true,
          autoplay: true,
          animationData: require(`../assets/drag-animation.json`)
        })  
 
        tippy(dragAndDrop.current, {
            content: "Si quieres subir un nuevo archivo, sólo arrastralo aquí!",
            trigger: 'mouseenter focus',
            placement: "bottom",
            animation: 'scale',
            allowHTML: false
          });

          document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
            const dropZoneElement = inputElement.closest(".drop-zone");
          
            dropZoneElement.addEventListener("click", (e) => {
              inputElement.click();
            });
          
            inputElement.addEventListener("change", (e) => {
              if (inputElement.files.length) {
                updateThumbnail(dropZoneElement, inputElement.files[0]);
              }
            });
          
            dropZoneElement.addEventListener("dragover", (e) => {
              e.preventDefault();
              dropZoneElement.classList.add("drop-zone--over");
            });
          
            ["dragleave", "dragend"].forEach((type) => {
              dropZoneElement.addEventListener(type, (e) => {
                dropZoneElement.classList.remove("drop-zone--over");
              });
            });
          
            dropZoneElement.addEventListener("drop", (e) => {
              e.preventDefault();
          
              if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
              }
          
              dropZoneElement.classList.remove("drop-zone--over");
            });
          });
          
          /**
           * Updates the thumbnail on a drop zone element.
           *
           * @param {HTMLElement} dropZoneElement
           * @param {File} file
           */
          function updateThumbnail(dropZoneElement, file) {
            let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
          
            // First time - remove the prompt
            if (dropZoneElement.querySelector(".drop-zone__prompt")) {
              dropZoneElement.querySelector(".drop-zone__prompt").remove();
            }
          
            // First time - there is no thumbnail element, so lets create it
            if (!thumbnailElement) {
              thumbnailElement = document.createElement("div");
              thumbnailElement.classList.add("drop-zone__thumb");
              dropZoneElement.appendChild(thumbnailElement);
            }
          
            thumbnailElement.dataset.label = file.name;
          
            // Show thumbnail for image files
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
          
              reader.readAsDataURL(file);
              reader.onload = () => {
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
              };
            } else {
              thumbnailElement.style.backgroundImage = null;
            }
          }

          setPreventOnFirstRender(false)

          let fileInput = dragAndDrop.current
          fileInput.addEventListener('dragenter', fileSelected);
          
    },[])

    const fileSelected = () => {console.log("drag")
      dragAndDrop.current.removeChild(dragAndDrop.current.children[1]);
    }

    const docSubmit = () => { 

    dragAndDrop.current.removeChild(dragAndDrop.current.children[1]);
    dragAndDrop.current.style.backgroundImage = "";
    
    lottie.loadAnimation({
      container: dragAndDrop.current,
      render: 'svg',
      loop: true,
      autoplay: true,
      animationData: require(`../assets/rocket-upload-file.json`)
    })  

      const casesEndpoint = store.getState().fetchBase + "casos/";//PRIMERO SE HACE GET A CASOS PARA TRAER TODOS LOS CASOS DEL CLIENTE
      const casesId = clickedCase.caseId
      const casesCode = clickedCase.caseCode
      let documentType = document.getElementById("uploadFileTypeSelection").value

      // SE INSERTAN DATOS DEL DOCUMENTO EN LA TABLA DOCUMENTS, CON ID DEL CASO
      const docsEndpoint = store.getState().fetchBase + "documentos/no_rol";; 
      const docData = {
          documents_type: documentType,
          documents_cases_id: casesId
      };
                      
      // request options
      const docOptions = {
        method: 'POST',
        body: JSON.stringify(docData),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      fetch(docsEndpoint, docOptions)
      .then(res => {return res.json()})
      .then(data => { 
        setDocumentLastRowInsertedId(data.resp)
      })
      .catch(error=>{ 
        console.log(error)
      })
  }



        return( 
             <div className="container">
                <div className="row">
                  <div className="col-8">
                      <div className="drop-zone" style={{minWidth: '50px'}} ref={dragAndDrop}>
                          <input onChange={fileSelected} ref={pdfFile} type="file" name="myFile" className="drop-zone__input"/>
                      </div>
                  </div>
                  <div className="col-4">
                    <Button id="uploadFileBtn" cursor="pointer" onClickFunction={docSubmit}>GUARDAR</Button>
                    <MultiSelection options={["Sentencia","Avenimiento","Conciliación","Contestación",
                    "Medio de prueba","Escritura Pública","Escritura Privada","Inscripción",
                    "Comprobante Ingreso Administrativo","Certificado","Comprobante Ingreso Judicial",
                    "Boleta Gasto","Notificación Receptor","Demanda","Recurso","Informe",
                    "Publicación","Resolución (fija Audiencia)","Resolución Relevante",
                    "Documento Otros"]} id="uploadFileTypeSelection"/>
                  </div>
                </div>
             </div>
           
        );

}

  /*

readMe

#Props brief:

*data: any data that you want to pass to component, can be several propouses
*/