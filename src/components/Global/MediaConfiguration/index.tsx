import { SourceDeviceStateProps } from "@/hooks/useMediaSources"
import useStudioSettings from "@/hooks/useStudioSettings";
import { Headphones, Monitor } from "lucide-react";
import { Loader } from "../Loader";

type Props = {
    state: SourceDeviceStateProps;
    user:
      | ({
          subscription: {
            plan: 'PRO' | 'FREE';
          } | null;
          studio: {
            id: string;
            screen: string | null;
            mic: string | null;
            camera: string | null;
            preset: 'HD' | 'SD';
            userId: string | null;
          }  | null
        } & {
          id: string;
          email: string;
          firstname: string | null;
          lastname: string | null;
          createdAt: Date;
          clerkid: string;
        })
    | null 
}
  const MediaConfiguration = ({ state, user }: Props) => {
    // here we will find if the user have a source and if not then we will set the first source as the default source

    // find the active screen
    const activeScreen = state.displays?.find(
      (screen) => screen.id === user?.studio?.screen
    );
  // find the active audio
    const activeAudio = state.audioInputs?.find(
      (device) => device.deviceId === user?.studio?.mic
    );
  // find the active camera
    const { isPending, onPreset, register } = useStudioSettings(
      user!.id,
      user?.studio?.screen || state.displays?.[0]?.id,
      user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
      user?.studio?.preset,
      user?.subscription?.plan
    );
  
    return (
      <form className="h-full relative w-full flex col gap-y-5">
  { isPending && (
  <div className="fixed z-50 w-full top-0 left-0 right-0 bottom-0 rounded-2xl h-full bg-black/80 flex justify-center items-center">
    <Loader />
  </div>
  )}
  <div className="flex gap-x-5 justify-center items-center">
    <Monitor
      fill="#575655"
      color="#575655"
      size={36}
    />
  </div>
  <select {...register('screen')}  className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full">
    {state.displays?.map((display,key) => (
      <option selected={activeScreen && activeScreen.id === display.id} key={key} className="bg-[#171717] cursor-pointer" value={display.id}>
      {display.name}
      </option>
    ))}

  </select>
  <div className="flex gap-x-5 justify-center items-center">
    <Headphones color="#575655" size={36}/>
  </div>
  <select {...register('audio')} className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full">
    {state.audioInputs?.map((audio,key) => (
      <option selected={activeAudio && activeAudio.deviceId === audio.deviceId} key={key} className="bg-[#171717] cursor-pointer" value={audio.deviceId}>
        {audio.label}
      </option>
    ))}
  </select>
</form>
    );
  };
  
  export default MediaConfiguration;

  