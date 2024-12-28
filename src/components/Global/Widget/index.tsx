import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import { Loader } from "../Loader";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/lib/utils";
import { useMediaSources } from "@/hooks/useMediaSources";


export default function Widget() {
    const[profile,setProfile]=useState<{status: number;
  user: 
      | ({
          subscription: {
            plan: 'PRO' | 'FREE';
          } | null;
          studio: {
            id: string;
            screen: string | null;
            mic: string | null;
            preset: 'HD' | 'SD';
            camera: string | null;
            userId: string | null;
          } | null;
        } 
        & {
          id: string;
          email: string;
          firstname: string | null;
          lastname: string | null;
          createdAt: Date;
          clerkId: string;
        })
        | null
    } | null>(null);

    // getting access to the user object
    const {user}=useUser();
    // getting access to the media resources
    const {state,fetchMediaResources}=useMediaSources();
    useEffect(()=>{
      if(user && user.id){
        fetchUserProfile(user.id)
        .then((p)=>setProfile(p))
      }
    })
    return (
        <div className="p-5">
            <ClerkLoading>
                <div className="h-full flex justify-center items-center">
                    <Loader/>
                </div>
            </ClerkLoading>
            {/* <SignedIn>
                {profile ? <MediaConfiguration/>:
                <div className="w-full h-full flex justify-center items-center">
                    <Loader color="#fff" />
                </div>
                }
            </SignedIn> */}
        </div>
    )
}