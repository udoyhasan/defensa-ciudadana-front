import React ,{ useEffect, useRef} from 'react';
import lottie from 'lottie-web';



export default function LottieContainer(props){
    const ref = useRef(null)

    useEffect(()=>{ 
                lottie.loadAnimation({
                    container: ref.current,
                    render: 'svg',
                    loop: props.loop,
                    autoplay: props.play,
                    animationData: require(`../assets/${props.lottie}.json`),
                    name: props.name
                })
        }, [])

    useEffect(()=>{ //HERE THE COMPONENT DISPLAY OR NOT THE ERROR ANIMATION FOLLOW THE PROPS.PLAY CHANGE FROM THE PARENT COMPONENT

        if(props.play){lottie.play(props.name)}
        else{lottie.stop(props.name)}

    }, [props.play])

        return( 
           <>   
                <div ref={ref} style={{width: props.width, display: props.display, backgroundColor: props.backgroundColor}} className={`container ${props.additionalClassName}`}></div>
           </> 

        );

}

/*
ReadME

props Brief:
*lottie: pass the lottie file name, the component make the path to it
*width
*loop: if the animation will repeate, or will be only once, assign a boolean
*delay: if you want to delay the lottie file animation, pass an integer like this  3000, dilay of 3 seconds, if not only set 0.
*play: when the animation have to play
*name: the identifiatior string of the animation
*backgroundColor
*additionalClassName
*/