import { useEffect, useRef } from "react"



export default function WebCam(){
    const camElement=useRef<HTMLVideoElement | null>(null);
    const streamWebCam=async()=>{
        const stream=await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        })
        if(camElement.current){
            camElement.current.srcObject=stream
            await camElement.current.play()
        }
    }
    useEffect(()=>{
       streamWebCam()
    },[])
    return (
    <video ref={camElement} 
    className="h-48 w-48 draggable object-cover rounded-full aspect-video border-2 relative border-white ">
      this is webcam
    </video>
    )
}