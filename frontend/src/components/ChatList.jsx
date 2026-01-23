import {useSelector,useDispatch} from "react-redux"
import {getMyChatPartners,setSelectedUser} from '../redux/chatSlice'
import {useEffect} from "react"
import UserSkeleton from '../components/UserSkeleton'
export default function ChatList(){
  const dispatch = useDispatch()
  const {isContactsLoading,chats} = useSelector(state=>state.chat)
  useEffect(()=>{
    dispatch(getMyChatPartners())
  },[dispatch])

  if(isContactsLoading) return <UserSkeleton/>

  return (  <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => dispatch(setSelectedUser(chat))}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/favicon.ico"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>)
}
