import {useSelector,useDispatch} from "react-redux"
import {setActiveTab} from '../redux/chatSlice'
export default function TabSwitch(){
  const dispatch = useDispatch()
  const {activeTab} = useSelector(state=>state.chat)
  return (<div className="tabs tabs-boxed bg-slate-700 p-1">
  <input
    type="radio"
    name="my_tabs_1"
    className="tab"
    aria-label="Chats"
    checked={activeTab=="chat"}
    onChange={()=>dispatch(setActiveTab("chat"))}
  />
  <input
    type="radio"
    name="my_tabs_1"
    className="tab"
    aria-label="Contacts"
    checked={activeTab=="contacts"}
    onChange={()=>dispatch(setActiveTab("contacts"))}
  />

</div>)
}
