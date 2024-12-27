import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import { Loader } from "../Loader";
import { useState } from "react";


export default function Widget() {
    const[profile,setProfile]=useState<{
        status: number;
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
    
    return (
        <div className="p-5">
            <ClerkLoading>
                <div className="h-full flex justify-center items-center">
                    <Loader/>
                </div>
            </ClerkLoading>
            <SignedIn>
                {}
            </SignedIn>
        </div>
    )
}