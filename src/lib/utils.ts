import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// 
const httpsClient=axios.create({
  baseURL:import.meta.env.VITE_HOST_URL
})


export const onCloseApp=()=>window.ipcRenderer.send('closeApp')

// fetchUserProfile function fetches the user profile from the server
export const fetchUserProfile=async (clerkId:string)=>{
 const response=await httpsClient.get(`/auth/${clerkId}`,{
  headers:{
    'Content-Type':'application/json'
  }
 })
 console.log(response)
 return response.data
}
// getMediaResources function fetches the media resources from the server
export const getMediaSources = async () => {
  const displays = await window.ipcRenderer.invoke('getSources');
  const enumerateDevices = await window.navigator.mediaDevices.enumerateDevices();
  const audioInputs = enumerateDevices.filter((device) => device.kind === 'audioinput');

  console.log('getting sources');

  return { displays, audio: audioInputs };
};


export const updateStudioSettings = async (
  id: string,
  screen: string,
  audio: string,
  preset: 'HD' | 'SD',
) => {
  const response = await httpsClient.post(`/studio/${id}`, {
    screen,
    audio,
    preset,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};


export function hidePluginWindow(state:boolean){
  window.ipcRenderer.send('hide-plugin',{state})
}


export const videoRecordingTime=(ms:number)=>{
  const second=Math.floor(ms/1000%60).toString().padStart(2,'0')
  const minute=Math.floor((ms/1000/60)%60).toString().padStart(2,'0')
  const hour=Math.floor(ms/1000/60/60).toString().padStart(2,'0')
  return {length:`${hour}:${minute}:${second}`,minute}
  
}

export const resizeWindow=(shrink:boolean)=>{
  window.ipcRenderer.send('resize-studio',{shrink})
}