import {useSelector,useDispatch} from "react-redux"
import {getAllContacts,setSelectedUser} from '../redux/chatSlice'
import {useEffect} from "react"
import UserSkeleton from '../components/UserSkeleton'
export default function ContactsList(){
  const dispatch = useDispatch()
  const {isContactsLoading,contacts} = useSelector(state=>state.chat)
  useEffect(()=>{
    dispatch(getAllContacts())
  },[dispatch])

  if(isContactsLoading) return <UserSkeleton/>

  return (  <>
      {contacts.map((chat) => (
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
