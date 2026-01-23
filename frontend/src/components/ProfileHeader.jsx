import {useSelector,useDispatch} from "react-redux"
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import {toggleSound} from '../redux/chatSlice'
import {logout} from '../redux/authSlice'
export default function ProfileHeader(){
  const dispatch = useDispatch()
  const {isSoundEnabled} = useSelector(state=>state.chat)
  const {authUser} = useSelector(state=>state.auth)
  const mouseClickSound = new Audio("/sounds/mouse-click.mp3");
  return (<div className="flex justify-between items-center p-2">
  <div className="flex gap-4 items-center">
  <div className="avatar">
    <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
      <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
    </div>
  </div>
  <div>
  <h3 className="text-white text-base">
  {authUser.fullName}
  </h3>
  </div>
  </div>

  <div className="flex gap-4 items-center">
  <button
           className="text-slate-400 hover:text-slate-200 transition-colors"
           onClick={()=>dispatch(logout())}
         >
           <LogOutIcon className="size-5" />
         </button>

         {/* SOUND TOGGLE BTN */}
         <button
           className="text-slate-400 hover:text-slate-200 transition-colors"
           onClick={() => {
             // play click sound before toggling
             mouseClickSound.currentTime = 0; // reset to start
             mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
             dispatch(toggleSound());
           }}
         >
           {isSoundEnabled ? (
             <Volume2Icon className="size-5" />
           ) : (
             <VolumeOffIcon className="size-5" />
           )}
         </button>
  </div>
  </div>)
}
