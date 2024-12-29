import { cn, onCloseApp } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { useState } from "react"


type Props={
    children: React.ReactNode
    className?: string
}


export default function ControlLayout({children,className}:Props){
    const [isVisible,setIsVisible]=useState<boolean>(false);
// The function  listens for the 'hide-plugin' event from the main process.
    window.ipcRenderer.on('hide-plugin',(event,payload)=>{
        console.log(event);
        setIsVisible(payload.state);
     })
    return (
        <div className={cn(className,isVisible && 'invisible', 'bg-[#171717] flex px-1 flex-col rounded-3xl overflow-hidden ' )}>
            <div className="flex justify-between items-center p-5 draggable">
               <span className="non-draggable">
               <UserButton/>
               </span>
               <X size={20} className="text-gray-400 non-draggable hover:text-white cursor-pointer" 
               onClick={onCloseApp} />
               </div>
               <div className="flex-1 h-0 overflow-auto">{children}</div>
                <div className="p-5 flex w-full">
                    <div className="flex items-center gap-x-2">
                        <img src="/opal-logo.svg" alt="app logo"/>
                    <p className="text-white text-2xl">Screenly</p> 
               
           

               </div>
            </div>
        </div>
    )
}