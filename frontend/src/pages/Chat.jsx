import React from 'react';
import {useSelector,useDispatch} from "react-redux"
import {logout} from '../redux/authSlice'
import ChatList from '../components/ChatList'
import ContactsList from '../components/ContactsList'
import ProfileHeader from '../components/ProfileHeader'
import TabSwitch from '../components/TabSwitch'
import ChatContainer from '../components/ChatContainer'
import NoConversationContainer from '../components/NoConversationContainer'
export default function Chat(){

  const dispatch = useDispatch();
  const {activeTab,selectedUser} = useSelector(state=>state.chat)
  return (<div className="relative z-10 bg-slate-800 rounded-2xl shadow-xl p-6 overflow-y-auto w-full h-[80vh] flex">
  <div className="w-[30%] border-r-2 border-indigo-600 pr-4">
    <ProfileHeader/>
    <TabSwitch />
    {activeTab=="chat"?<ChatList />:<ContactsList/>}
  </div>
  <div className="flex-1 flex flex-col">
    {selectedUser?<ChatContainer key={selectedUser._id}/>:<NoConversationContainer />}
  </div>

  </div>)
}
