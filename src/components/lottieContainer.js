import React ,{ useState, useEffect, useRef} from 'react';
import lottie from 'lottie-web';



export default function LottieContainer(props){
    const ref = useRef(null)

    useEffect(()=>{
            lottie.loadAnimation({
                container: ref.current,
                render: 'svg',
                loop: true,
                autoplay: true,
                animationData: require(`../assets/${props.lottie}.json`)
            })
        }, [])

        return( 
           <>   
                <div ref={ref} style={{width: props.width}} className="container"></div>
           </> 

        );

}