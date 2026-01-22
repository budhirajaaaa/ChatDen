import React from 'react';
import {useSelector,useDispatch} from "react-redux"
import {logout} from '../redux/authSlice'
export default function Chat(){

  const dispatch = useDispatch();

  return (<div className="z-42">
    <button onClick={()=>dispatch(logout())} >Logout</button>
  </div>)
}
