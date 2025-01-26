import { hidePluginWindow } from "./utils"
import {v4 as uuid} from 'uuid'
import io from 'socket.io-client'

let videoTransferFileName:string | undefined
let mediaRecorder:MediaRecorder
const socket=io(import.meta.env.VITE_SOCKET_URL as string)

let userId:string 
export default function StartRecording(onScourses:{
    screen:string 
    audio:string 
    id:string
}){
    hidePluginWindow(true)
    videoTransferFileName=`${uuid()}-${onScourses?.id.slice(0,8)}}.webm`
    mediaRecorder!.start(1000)
}

const stopRecording=()=>{
    hidePluginWindow(false)
    socket.emit('process-video',{
        filename:videoTransferFileName,
        userId
    })
}

export const onStopRecording=()=>{
    mediaRecorder!.stop()
}

export const onDataAvailable=(e:BlobEvent)=>{
   socket.emit("video-chunks",{
    chunks:e.data,
    filename:videoTransferFileName
   })
}

export const selectSources=async(onSources:{
    screen:string
    audio:string
    id:string
    preset:'HD' | 'SD'
},videoElement:React.RefObject<HTMLVideoElement>)=>{
  if(onSources && onSources.screen && onSources.audio && onSources.id){
    const constraints:any={
        audio:false,
        video:{
            mandatory:{
               chromeMediaSource:'desktop',
                chromeMediaSourceId:onSources?.screen,
                minWidth:onSources.preset==='HD' ? 1920 : 1280,
                minHeight:onSources.preset==='HD' ? 1080 : 720,
                maxWidth:onSources.preset==='HD' ? 1920 : 1280,
                maxHeight:onSources.preset==='HD' ? 1080 : 720,
                frameRate:60
            }
        }
    }
    userId=onSources.id 
    const stream=await navigator.mediaDevices.getUserMedia(constraints)
    const audioStream=await navigator.mediaDevices.getUserMedia({
        video:false,
        audio:onSources?.audio ? {
            deviceId:{exact:onSources.audio}
        } : false
    } )
        if(videoElement && videoElement.current){
            videoElement.current.srcObject=stream 
            await videoElement.current.play()
        }
        const combinedStream=new MediaStream([
            ...stream.getVideoTracks(),
            ...audioStream.getAudioTracks()
        ])
        mediaRecorder=new MediaRecorder(combinedStream,{
            mimeType:'video/webm; codecs=vp9'
        })
        mediaRecorder.ondataavailable=onDataAvailable
        mediaRecorder.onstart=stopRecording 

  }
}