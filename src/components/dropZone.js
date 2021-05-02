import React, { useEffect, useRef}  from 'react';
import lottie from 'lottie-web';
import tippy from 'tippy.js';
import 'tippy.js/animations/scale.css';



export default function DropZone(){

    //REFS
    const dragAndDrop = useRef(null);

    useEffect(()=>{

        tippy(dragAndDrop.current, {
            content: "Si quieres subir un nuevo archivo, sólo arrastralo aquí!",
            trigger: 'mouseenter focus',
            placement: "bottom",
            animation: 'scale',
            allowHTML: false
          });

        lottie.loadAnimation({
            container: dragAndDrop.current,
            render: 'svg',
            loop: true,
            autoplay: true,
            animationData: require(`../assets/drag-animation.json`)
          }) 

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
          
    },[])


        return( 
             <div className="container">
                <div className="row">
                <div className="col-2"/>
                <div className="col-8">
                    <div class="drop-zone" ref={dragAndDrop}>
                        <input type="file" name="myFile" class="drop-zone__input"/>
                    </div>
                </div>
                <div className="col-2"/>
                </div>
             </div>
           
        );

}

